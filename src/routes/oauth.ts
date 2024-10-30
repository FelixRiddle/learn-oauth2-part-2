import express from "express";
import Models from "felixriddle.mongodb-models";
import { jsonErrorCheck } from "./user";

/**
 * Oauth routes
 */
export default function oauthRoutes(models: Models) {
	const router = express.Router();

	router.get("/token", (req, res) => {
		const callback = {
			grant_type: "authorization_code",
			client_id: process.env.CLIENT_ID,
			client_secret: process.env.CLIENT_SECRET,
			code: req.query.code,
		};

		return fetch("http://localhost/oauth/token", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(callback),
		})
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				return jsonErrorCheck(data);
			})
			.then((data: any) => {
				// Store JWT
				return res.cookie("token", data.access_token, {
					maxAge: 900000,
					httpOnly: true,
				}).redirect((process.env as any).REDIRECT_URI);
			});
	});

	return router;
}
