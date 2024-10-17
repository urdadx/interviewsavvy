import passport from "passport";
import {
  Strategy as GoogleStrategy,
  type VerifyCallback,
  type StrategyOptions,
} from "passport-google-oauth2";
import { prisma } from "../config/db";
import { logger } from "../config/logger";
import type { UserData } from "@prisma/client";

const googleAuth = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
    scope: ["email", "profile"],
  } as StrategyOptions,
  async (_accessToken, _refreshToken, profile, done) => {
    try {
      const googleId = profile.id as string;

      let user = await prisma.userData.findFirst({
        where: {
          AuthProvider: {
            some: {
              googleId,
            },
          },
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

      console.log("user", user);

      if (!user) {
        user = await prisma.userData.create({
          data: {
            email: profile.email,
            name: profile.displayName,
            avatarUrl: profile.picture,
            AuthProvider: {
              create: {
                googleId,
              },
            },
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
      }

      done(null, user);
    } catch (error) {}
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

passport.use(googleAuth);
passport.serializeUser(serialize);
passport.deserializeUser(deserialize);
