import type { RequestHandler } from "express";

export const authGuard: RequestHandler = (req, res, next) => {
  if (!req.user) {
    res.status(401).json({
      error: {
        message: "Unauthorized",
      },
    });
    return;
  }

  next();
};
