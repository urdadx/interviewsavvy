import type { ApiResponse } from "@shared/types/api-response";
import { Router } from "express";
import createHttpError from "http-errors";

export const router = Router();

router.post("/submit", async (req, res, next) => {
  const { email } = req.body;
  try {
    const response = await fetch(
      `https://emailoctopus.com/api/1.6/lists/${process.env.EMAIL_OCTOPUS_LIST_ID}/contacts`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          api_key: process.env.EMAIL_OCTOPUS_KEY,
          email_address: email,
        }),
      }
    );

    if (!response.ok) {
      throw createHttpError(response.status, "Failed to submit email!");
    }

    const _response: ApiResponse = { message: "Email submitted successfully!" };

    res.status(200).json(_response);
  } catch (error) {
    next(error);
  }
});
