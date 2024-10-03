import express, { NextFunction, type Request, type Response } from "express";
import {
  errorLogger,
  httpLogger,
  logger,
  notFoundLogger,
} from "./config/logger";
import session from "express-session";
import cors from "cors";
import { cors as _cors } from "./middleware/cors";
import { session as _session } from "./middleware/session";
import { router as authRoutes } from "./api/auth-route";
import { router as docsRoutes } from "./api/docs-route";
import { router as indexRoutes } from "./api/index-route";

const app = express();

app.use(cors(_cors));
app.use(session(_session));

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

app.use(httpLogger);

// Routes here
app.use(["/", "/api"], indexRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/docs", docsRoutes);

app.use(notFoundLogger);
app.use(errorLogger);

app.listen(process.env.PORT || 8000, () => {
  logger.info(
    `Server is running on http://localhost:${process.env.PORT || 8000}`,
  );
});
