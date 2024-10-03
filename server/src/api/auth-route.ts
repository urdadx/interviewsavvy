import { Router } from "express";
import passport from "passport";
import "../auth/google-auth";
import createHttpError from "http-errors";
import { authGuard } from "../guards/auth-guard";

export const router = Router();

router.get("/google", passport.authenticate("google"));
router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: process.env.FRONTEND_URL,
    failureRedirect: "/error",
  }),
);

router.get("/me", authGuard, (req, res, next) => {
  try {
    res.status(200).json({ user: req.user });
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
      }),
    );

    res.status(200).json({
      message: "Logged out successfully",
    });
  } catch (error) {
    next(error);
  }
});
