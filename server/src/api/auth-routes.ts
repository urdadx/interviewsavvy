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

export const router = Router();

router.get("/google", passport.authenticate("google"));
router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: `${process.env.FRONTEND_URL}/callback`,
    failureRedirect: "/error",
  })
);

router.post("/login", passport.authenticate("local"), (req, res) => {
  if (req.user) {
    res.status(200).json({ message: "Login successfull" });
    return;
  }

  res.status(400).json({ message: "Login failed" });
});

router.post("/signup", async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!isValidEmail(email)) {
      res.status(400).json({ message: "Invalid email format." });
      return;
    }

    if (!isValidPassword(password)) {
      res.status(400).json({
        message:
          "Weak password. Password must be at least 8 characters long, contain at least one uppercase letter, one number, and one special character.",
      });
      return;
    }

    const userExists = await prisma.userData.findUnique({
      where: { email },
    });

    if (userExists) {
      res.status(400).json({ message: "User with this email already exists" });
      return;
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

    passport.authenticate("local")(req, res, function () {
      res.status(200).json({ message: "Signup successfull" });
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

    res.status(200).json({
      message: "Logged out successfully",
    });
  } catch (error) {
    next(error);
  }
});
