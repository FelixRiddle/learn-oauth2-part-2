import { NextFunction, Request, Response } from "express";
import { jsonErrorCheck } from "routes/user";

/**
 * Get user middleware
 */
export default async function getUser(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		if (req.cookies.token) {
			const credentials = {
				method: "get",
				headers: {
					"Authorization": "Bearer " + req.cookies.token,
					"Content-Type": "application/x-www-form-urlencoded"
				}
			}
			
			return await fetch("http://localhost/api/user", credentials)
				.then(response => response.json())
				.then(data => jsonErrorCheck(data))
				.then((data) => {
					res.locals.token = req.cookies["token"];
					res.locals.user = data;
					return next();
				});
		} else {
			return next();
		}
	} catch (err) {
		console.error(err);
		return res.status(500).send({
			messages: [
				{
					error: true,
					message: "Internal error",
				},
			],
		});
	}
}
