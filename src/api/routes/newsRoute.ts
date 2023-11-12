import {NextFunction, Router} from "express";

import logger from "@loaders/logger";

// import middlewares from "@api/middlewares";

import expressUtil from "@util/expressUtil";

import {iRequest, iResponse, RouteType} from "@customTypes/expressTypes";
import {iNewsSubmissionDTO} from "customTypes/appDataTypes/newsTypes";
import {celebrate, Segments} from "celebrate";
import {newsSubmissionBodySchema} from "validations/newsRouteSchemas";
import NewsService from "services/NewsService";

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
		"/",
		celebrate({
			[Segments.BODY]: newsSubmissionBodySchema,
		}),
		async (
			req: iRequest<iNewsSubmissionDTO>,
			res: iResponse<{id: string}>,
			next: NextFunction
		) => {
			const uniqueRequestId = expressUtil.parseUniqueRequestId(req);

			logger.debug(
				uniqueRequestId,
				"Calling POST:/news endpoint with body:",
				null,
				{
					requestBody: req.body,
				}
			);

			try {
				const {body} = req;

				const result = await newsService.addNews(uniqueRequestId, body);

				logger.debug(
					uniqueRequestId,
					"POST:/news :: Completed newsService.addNews & sending result to client:",
					null,
					{
						result,
					}
				);

				const {httpStatusCode} = result;

				return res.status(httpStatusCode).json(result);
			} catch (error) {
				logger.error(uniqueRequestId, "Error on POST:/news :", error);

				return next(error);
			}
		}
	);
};

export default newsRoute;
