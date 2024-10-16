import { Router } from "express";
import createHttpError from "http-errors";
import passport from "passport";
import "../auth/google-auth";
import "../auth/local-auth";
import { authGuard } from "../guards/auth-guard";
import {
  hashPassword,
  isValidEmail,
  isValidPassword,
  prepareUser,
} from "../helpers/auth-helpers";
import { prisma } from "../config/db";
import type { ApiResponse } from "@shared/types/api-response";
import type { User } from "@shared/types/user";

export const router = Router();

router.get("/google", passport.authenticate("google"));
router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: `${process.env.FRONTEND_URL}/callback`,
    failureRedirect: "/error",
  })
);

router.post("/login", passport.authenticate("local"), (req, res, next) => {
  try {
    if (!req.user) {
      throw createHttpError(400, "Login failed");
    }

    const response: ApiResponse = {
      message: "Login successfull",
    };

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

router.post("/signup", async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!isValidEmail(email)) {
      throw createHttpError(400, "Invalid email format.");
    }

    if (!isValidPassword(password)) {
      throw createHttpError(
        400,
        "Weak password. Password must be at least 8 characters long, contain at least one uppercase letter, one number, and one special character."
      );
    }

    const userExists = await prisma.userData.findUnique({
      where: { email },
    });

    if (userExists) {
      throw createHttpError(400, "User with this email already exists");
    }

    const { avatarUrl, hashedPassword } = await prepareUser(email, password);

    await prisma.userData.create({
      data: {
        avatarUrl,
        name,
        email,
        passwordHash: hashedPassword,
      },

      select: {
        id: true,
        email: true,
        name: true,
        avatarUrl: true,
        createdAt: true,
        updatedAt: true,
        AuthProvider: {
          select: {
            googleId: true,
          },
        },
      },
    });

    const response: ApiResponse = {
      message: "Signup successfull",
    };

    passport.authenticate("local")(req, res, () => {
      res.status(200).json(response);
    });
  } catch (error) {
    next(error);
  }
});

router.get("/me", authGuard, (req, res, next) => {
  try {
    res.status(200).json({ ...req.user });
  } catch (error) {
    next(error);
  }
});

router.post("/logout", authGuard, (req, res, next) => {
  try {
    req.logOut(() =>
      req.session.destroy((error) => {
        if (error) {
          throw createHttpError(400, "Bad/Invalid logout request");
        }
      })
    );

    const response: ApiResponse = {
      message: "Logged out successfully",
    };

    res.status(200).json({
      message: "Logged out successfully",
    });
  } catch (error) {
    next(error);
  }
});
