import {Router} from "express";

import authRoute from "@api/routes/authRoute";
import userRoute from "@api/routes/usersRoute";
import verificationRoute from "@api/routes/verificationRoute";
import annotationsRoute from "./routes/annotationsRoute";

const getRouter = (): Router => {
	const apiRouter = Router();

	// connecting all api routes
	authRoute(apiRouter);
	userRoute(apiRouter);
	verificationRoute(apiRouter);
	annotationsRoute(apiRouter);

	return apiRouter;
};

export default getRouter;
