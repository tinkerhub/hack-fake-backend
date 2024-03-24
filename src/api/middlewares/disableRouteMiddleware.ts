import {Request, Response, NextFunction} from "express";

import logger from "@loaders/logger";

import {httpStatusCodes} from "@customTypes/networkTypes";

import {genericServiceErrors} from "@constants/errors/genericServiceErrors";

import serviceUtil from "@util/serviceUtil";
import expressUtil from "@util/expressUtil";

/**
 * Middleware to disable a route.
 *
 * @param req - Express request object.
 * @param res - Express response object.
 * @param next - Express next function.
 */
export function disableRoute(
	req: Request,
	res: Response,
	next: NextFunction
): void {
	logger.silly("disableRoute:: Called");

	const uniqueRequestId = expressUtil.parseUniqueRequestId(req);

	// Build an error response.
	const errorResponse = serviceUtil.buildResult(
		false,
		httpStatusCodes.CLIENT_ERROR_FORBIDDEN,
		uniqueRequestId,
		genericServiceErrors.errors.RouteDisabled
	);

	// Send a response with 403 (Forbidden) status code and the error response.
	res.status(403).json(errorResponse);
}
