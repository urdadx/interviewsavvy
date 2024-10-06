import passport from "passport";
import {
  Strategy as GoogleStrategy,
  type StrategyOptions,
} from "passport-google-oauth2";
import { prisma } from "../config/db";
import { logger } from "../config/logger";

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

const serialize = (user: any, done: any) => {
  done(null, user.id);
};

const deserialize = async (userId: any, done: any) => {
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
