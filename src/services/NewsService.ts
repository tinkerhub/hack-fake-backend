import logger from "@loaders/logger";

import {db} from "@db/index";

import serviceUtil from "@util/serviceUtil";

import {iGenericServiceResult} from "@customTypes/commonServiceTypes";
import {httpStatusCodes} from "@customTypes/networkTypes";

import {NullableString} from "@customTypes/commonTypes";
// import {iNewsAnnotationsInputDTO} from "customTypes/appDataTypes/newsTypes";

export default class NewsService {
	public async annotateNews(
		uniqueRequestId: NullableString
	): Promise<iGenericServiceResult<null>> {
		return db.task("annotate-news", async (task) => {
			logger.silly("Annotating the news");

			await task.newsAnnotations.annotate();
			console.log("hello");

			return serviceUtil.buildResult(
				true,
				httpStatusCodes.SUCCESS_CREATED,
				uniqueRequestId,
				null
			);
		});
	}
}
