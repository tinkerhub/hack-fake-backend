import logger from "@loaders/logger";

import {db} from "@db/index";

import serviceUtil from "@util/serviceUtil";

import {iGenericServiceResult} from "@customTypes/commonServiceTypes";
import {httpStatusCodes} from "@customTypes/networkTypes";

import {NullableString} from "@customTypes/commonTypes";
import {iNewsSubmissionDTO} from "@customTypes/appDataTypes/newsTypes";
import securityUtil from "util/securityUtil";

export default class NewsService {
	public async addNews(
		uniqueRequestId: NullableString,
		news: iNewsSubmissionDTO
	): Promise<iGenericServiceResult<{id: string} | null>> {
		return db.tx("add-news", async (task) => {
			logger.silly("Inserting new news record to news table");

			const uuid = securityUtil.generateUUID();

			const newNewsRecord = await task.news.add(
				uuid,
				news.publishedDate,
				news.url,
				news.title,
				news.content
			);

			return serviceUtil.buildResult(
				true,
				httpStatusCodes.SUCCESS_OK,
				uniqueRequestId,
				null,
				{
					id: newNewsRecord.id,
				}
			);
		});
	}
}
