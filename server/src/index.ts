import cors from "cors";
import express from "express";
import session from "express-session";
import passport from "passport";
import { router as authRoutes } from "./api/auth-routes";
import { router as docsRoutes } from "./api/docs-routes";
import { router as indexRoutes } from "./api/index-routes";
import {
  errorLogger,
  httpLogger,
  logger,
  notFoundLogger,
} from "./config/logger";
import { cors as _cors } from "./middleware/cors";
import { session as _session } from "./middleware/session";

const app = express();

app.use(cors(_cors));
app.use(session(_session));

app.use(passport.initialize());
app.use(passport.session());

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
    `Server is running on http://localhost:${process.env.PORT || 8000}`
  );
});
