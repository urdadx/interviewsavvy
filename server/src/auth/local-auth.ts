import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { prisma } from "../config/db";
import { logger } from "../config/logger";
import { verifyPassword } from "../helpers/auth-helpers";
import type { VerifyCallback } from "passport-google-oauth2";
import type { UserData } from "@prisma/client";

const localAuth = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  async (email, password, done) => {
    try {
      const user = await prisma.userData.findUnique({
        where: { email },
        select: {
          id: true,
          email: true,
          name: true,
          passwordHash: true,
          avatarUrl: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      if (!user) {
        return done(null, false, { message: "Invalid email or password" });
      }

      const isMatch = await verifyPassword(
        password,
        user.passwordHash as string
      );

      if (!isMatch) {
        return done(null, false, { message: "Invalid email or password" });
      }

      return done(null, user);
    } catch (error) {
      logger.error(error);
      return done(error);
    }
  }
);

const serialize = (user: Express.User, done: VerifyCallback) => {
  done(null, (user as Partial<UserData>).id);
};

const deserialize = async (userId: string, done: VerifyCallback) => {
  try {
    const user = await prisma.userData.findUnique({
      where: {
        id: userId,
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

    done(null, user);
  } catch (error) {
    logger.error(error);
    done(error, null);
  }
};

passport.use("local", localAuth);
passport.serializeUser(serialize);
passport.deserializeUser(deserialize);
