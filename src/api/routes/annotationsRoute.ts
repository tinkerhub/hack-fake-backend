import {NextFunction, Router} from "express";

import logger from "@loaders/logger";

// import middlewares from "@api/middlewares";

import expressUtil from "@util/expressUtil";

import {iRequest, iResponse, RouteType} from "@customTypes/expressTypes";
import {MultiAnnotation} from "@customTypes/appDataTypes/annotationTypes";
import AnnotationService from "@services/AnnotationService";
import middlewares from "@api/middlewares";

const route = Router();
const annotationService = new AnnotationService();

const annotationsRoute: RouteType = (apiRouter) => {
	apiRouter.use("/annotations", route);

	/*
		Registering isAuthorized middleware to the entire /users route
		as all the endpoint in this route needs authorization.
	*/
	route.use(middlewares.isAuthorized);

	route.get(
		"/",
		async (
			req: iRequest,
			res: iResponse<MultiAnnotation>,
			next: NextFunction
		) => {
			const uniqueRequestId = expressUtil.parseUniqueRequestId(req);

			logger.debug(
				uniqueRequestId,
				"Calling GET:/annotations endpoint with body:",
				null,
				{
					requestBody: req.body,
				}
			);

			try {
				const result = await annotationService.getAnnotationOptions(
					uniqueRequestId
				);

				logger.debug(
					uniqueRequestId,
					"GET:/annotations:: Completed annotationsService.getAnnotationOptions & sending result to client:",
					null,
					{
						result,
					}
				);

				const {httpStatusCode} = result;

				return res.status(httpStatusCode).json(result);
			} catch (error) {
				console.log("🚀 ~ file: annotationsRoute.ts:61 ~ error:", error);
				logger.error(uniqueRequestId, "Error on GET:/annotations:", error);

				return next(error);
			}
		}
	);
};

export default annotationsRoute;
