import express, { Request, Response } from "express";
import Models from "felixriddle.mongodb-models";
import getUser from "@/middleware/getUser";

export default function dashboardRouter(models: Models) {
	const router = express.Router();

	/**
	 * Dashboard
	 *
	 * Apply middleware to your route
	 * You basically stack middleware after the page string
	 * and before your page render
	 * otherwise the middleware would never get called
	 */
	router.get("/dashboard", (getUser as any), (req: any, res: Response) => {
		
		return res.render("/dashboard", {
			token: res.locals.token,
			user: res.locals.user
		});
	});
	
	return router;
}
