import {NextFunction, Router} from "express";

import logger from "@loaders/logger";

// import middlewares from "@api/middlewares";

import expressUtil from "@util/expressUtil";

import {
	iRequest,
	iRequestParams,
	iResponse,
	RouteType,
} from "@customTypes/expressTypes";
import {
	iNewsAnnotationsInputDTO,
	iNewsSubmissionDTO,
} from "customTypes/appDataTypes/newsTypes";
import {celebrate, Segments} from "celebrate";
import {
	newsAnnotationBodySchema,
	newsSubmissionBodySchema,
} from "validations/newsRouteSchemas";
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

	route.post(
		"/annotate",
		celebrate({
			[Segments.BODY]: newsAnnotationBodySchema,
		}),
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
				const {body} = req;

				const result = await newsService.annotateNews(uniqueRequestId, body);

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

	route.get(
		"/:newsId/predict",
		async (
			req: iRequestParams<{
				newsId: string;
			}>,
			res: iResponse<{annotationIds: string[]}>,
			next: NextFunction
		) => {
			const uniqueRequestId = expressUtil.parseUniqueRequestId(req);

			logger.debug(
				uniqueRequestId,
				"Calling GET:/news/:newsId/predict endpoint with params:",
				null,
				{
					requestParams: req.params,
				}
			);

			try {
				const {newsId} = req.params;

				const result = await newsService.predictAnnotation(
					uniqueRequestId,
					newsId
				);

				logger.debug(
					uniqueRequestId,
					"GET:/news/:newsId/predict :: Completed newsService.predictAnnotation & sending result to client:",
					null,
					result
				);

				return res.status(200).json(result);
			} catch (error) {
				logger.error(
					uniqueRequestId,
					"Error on GET:/news/:newsId/predict :",
					error
				);

				return next(error);
			}
		}
	);
};

export default newsRoute;
