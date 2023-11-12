import {Router} from "express";

import authRoute from "@api/routes/authRoute";
import userRoute from "@api/routes/usersRoute";
import verificationRoute from "@api/routes/verificationRoute";
import newsRoute from "@api/routes/newsRoute";
import annotationsRoute from "./routes/annotationsRoute";

const getRouter = (): Router => {
	const apiRouter = Router();

	// connecting all api routes
	authRoute(apiRouter);
	userRoute(apiRouter);
	verificationRoute(apiRouter);
	annotationsRoute(apiRouter);
	newsRoute(apiRouter);

	return apiRouter;
};

export default getRouter;
