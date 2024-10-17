import { Router } from "express";

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
			},
		);

		if (response.status === 200) {
			res.status(200).send("Email submitted successfully!");
		} else {
			res.status(response.status).send("Failed to submit email!");
		}
	} catch (error) {
		next(error);
	}
});
