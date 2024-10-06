import { Router } from "express";

export const router = Router();

router.get("/", (_, res) => {
  res.redirect("/api");
});

router.get("/api", (_, res) => {
  res.redirect("/api/docs");
});
