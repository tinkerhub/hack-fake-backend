import logger from "@loaders/logger";

import {db} from "@db/index";

import serviceUtil from "@util/serviceUtil";

import {iGenericServiceResult} from "@customTypes/commonServiceTypes";
import {httpStatusCodes} from "@customTypes/networkTypes";

import {NullableString, StringArray} from "@customTypes/commonTypes";
import {
	iNewsAnnotationsInputDTO,
	iNewsSubmissionDTO,
} from "@customTypes/appDataTypes/newsTypes";
import securityUtil from "@util/securityUtil";
import {newsServiceError} from "@constants/errors/newsServiceErrors";
import {DBTaskType} from "@db/repositories";

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

	public async annotateNews(
		uniqueRequestId: NullableString,
		annotationInputDTO: iNewsAnnotationsInputDTO
	): Promise<iGenericServiceResult<null>> {
		return db.tx("annotate-news", async (transaction) => {
			const {newsId, annotations} = annotationInputDTO;

			logger.silly("Checking if news exists");
			const newsRecord = await transaction.news.findById(newsId);

			if (!newsRecord) {
				return serviceUtil.buildResult(
					false,
					httpStatusCodes.CLIENT_ERROR_BAD_REQUEST,
					uniqueRequestId,
					newsServiceError.generic.NewsDoesNotExists
				);
			}

			// check if the annotations exists
			logger.silly("Checking if annotations exists");
			const annotationRecords = await transaction.annotations.findByIds(
				annotations
			);

			if (annotationRecords.length !== annotations.length) {
				return serviceUtil.buildResult(
					false,
					httpStatusCodes.CLIENT_ERROR_BAD_REQUEST,
					uniqueRequestId,
					newsServiceError.annotateNews.InvalidAnnotation
				);
			}

			logger.silly("Inserting all annotations to annotation map table");
			const newsAnnotationMapRecords = annotations.map((annotationId) => {
				return {
					id: securityUtil.generateUUID(),
					newsId,
					annotationId,
					annotatedBy: "USER",
					userId: null, // FIXME: Add userId from request
				};
			});

			await transaction.batch(
				newsAnnotationMapRecords.map((record) => {
					return transaction.newsAnnotationMap.add(
						record.id,
						record.newsId,
						record.annotationId,
						record.annotatedBy,
						record.userId
					);
				})
			);

			return serviceUtil.buildResult(
				true,
				httpStatusCodes.SUCCESS_CREATED,
				uniqueRequestId,
				null
			);
		});
	}

	public async predictAnnotation(
		uniqueRequestId: NullableString,
		newsId: string
	): Promise<iGenericServiceResult<{annotationIds: StringArray} | null>> {
		return db.task("predict-annotation", async (task) => {
			const newsRecord = await task.news.findById(newsId);
			if (!newsRecord) {
				return serviceUtil.buildResult(
					false,
					httpStatusCodes.CLIENT_ERROR_BAD_REQUEST,
					uniqueRequestId,
					newsServiceError.generic.NewsDoesNotExists
				);
			}

			// TODO: Call ML model to predict annotations
			// Now calling a dummy function which queries the database to get all annotations and return a few of them randomly
			const annotationIds: StringArray = await this.getRandomAnnotationIds(
				task
			);

			// Insert predicted annotations to news_annotation_map table if annotationIds is not empty
			if (annotationIds.length > 0) {
				await task.newsAnnotationMap.add(
					securityUtil.generateUUID(),
					newsId,
					annotationIds[0],
					"AI",
					null
				);
			}

			return serviceUtil.buildResult(
				true,
				httpStatusCodes.SUCCESS_OK,
				uniqueRequestId,
				null,
				{
					annotationIds,
				}
			);
		});
	}

	private async getRandomAnnotationIds(dbTask: DBTaskType): Promise<string[]> {
		const annotations = await dbTask.annotations.all();

		const annotationIds = annotations.map((annotation) => {
			return annotation.id;
		});

		const randomAnnotationIds = [];

		while (randomAnnotationIds.length < 3 && annotationIds.length > 0) {
			const randomIndex = Math.floor(Math.random() * annotationIds.length);
			const randomAnnotationId = annotationIds.splice(randomIndex, 1)[0];
			randomAnnotationIds.push(randomAnnotationId);
		}

		return randomAnnotationIds;
	}
}
