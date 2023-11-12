import {Router} from "express";

import authRoute from "@api/routes/authRoute";
import userRoute from "@api/routes/usersRoute";
import verificationRoute from "@api/routes/verificationRoute";
import annotationsRoute from "@api/routes/annotationsRoute";
import newsRoute from "@api/routes/newsRoute";

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
