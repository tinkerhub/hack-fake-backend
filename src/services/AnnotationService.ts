import logger from "@loaders/logger";

// import {db} from "@db/index";

import serviceUtil from "@util/serviceUtil";

import {iGenericServiceResult} from "@customTypes/commonServiceTypes";
import {httpStatusCodes} from "@customTypes/networkTypes";

import {NullableString} from "@customTypes/commonTypes";
import {MultiAnnotation} from "customTypes/appDataTypes/annotationTypes";

export default class AnnotationService {
	public async getAnnotationOptions(
		uniqueRequestId: NullableString
	): Promise<iGenericServiceResult<MultiAnnotation | null>> {
		// return db.task("get-annotation-options", async (task) => {
		logger.silly("Retrieving the annotations");
		// const annotationRecords = await task.annotations.all();

		const multiAnnotations: MultiAnnotation = {
			ids: [],

			items: {},
		};

		// if (annotationRecords) {
		// }

		return serviceUtil.buildResult(
			true,
			httpStatusCodes.SUCCESS_OK,
			uniqueRequestId,
			null,
			multiAnnotations
		);
		// });
	}
}
