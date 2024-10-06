import { Router } from "express";
import { specs, swaggerUi } from "../config/docs";

export const router = Router();

router.use("/", swaggerUi.serve, swaggerUi.setup(specs));
