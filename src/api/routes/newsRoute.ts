import {NextFunction, Router} from "express";

import logger from "@loaders/logger";

// import middlewares from "@api/middlewares";

import expressUtil from "@util/expressUtil";

import {iRequest, iResponse, RouteType} from "@customTypes/expressTypes";
import {iNewsAnnotationsInputDTO} from "@customTypes/appDataTypes/newsTypes";
import NewsService from "@services/NewsService";

const route = Router();
const newsService = new NewsService();

const newsRoute: RouteType = (apiRouter) => {
	apiRouter.use("/news", route);

	/*
		Registering isAuthorized middleware to the entire /users route
		as all the endpoint in this route needs authorization.
	*/
	// route.use(middlewares.isAuthorized);

	route.post(
		"/annotate",
		async (
			req: iRequest<iNewsAnnotationsInputDTO>,
			res: iResponse<null>,
			next: NextFunction
		) => {
			const uniqueRequestId = expressUtil.parseUniqueRequestId(req);

			logger.debug(
				uniqueRequestId,
				"Calling POST:news/annotate endpoint with body:",
				null,
				{
					requestBody: req.body,
				}
			);

			try {
				const result = await newsService.annotateNews(uniqueRequestId);

				logger.debug(
					uniqueRequestId,
					"POST:news/annotate:: Completed newsService.annotateNews & sending result to client:",
					null,
					{
						result,
					}
				);

				const {httpStatusCode} = result;

				return res.status(httpStatusCode).json(result);
			} catch (error) {
				console.log("🚀 ~ file: newsRoute.ts:61 ~ error:", error);
				logger.error(uniqueRequestId, "Error on POST:news/annotate:", error);

				return next(error);
			}
		}
	);
};

export default newsRoute;
