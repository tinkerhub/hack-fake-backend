import axios, {AxiosResponse} from "axios";
import {StringArray} from "@customTypes/commonTypes";
import annotationUtil from "@util/annotationUtil";

const apiBaseUrl = "http://98.70.59.151:8000";

export default class MLService {
	async predict(inputData: {
		title: string;
		content: string;
	}): Promise<{isSuccess: boolean; predictedAnnotations: StringArray}> {
		try {
			const response: AxiosResponse = await axios.post(
				`${apiBaseUrl}/predict`,
				{
					heading: inputData.title,
					text: inputData.content,
				}
			);

			if (response.status === 200) {
				// Assuming the API returns the prediction result in the response data
				const predictionResult = response.data;
				console.log(
					"🚀 ~ file: MLService.ts:24 ~ MLService ~ predictionResult:",
					predictionResult
				);

				const predictedAnnotationIds =
					annotationUtil.getHighScoringAnnotationIds(predictionResult);
				console.log(
					"🚀 ~ file: MLService.ts:30 ~ MLService ~ predictedAnnotationIds:",
					predictedAnnotationIds
				);

				return {
					isSuccess: true,
					predictedAnnotations: predictedAnnotationIds,
				};
			}
			// Handle other HTTP status codes if needed
			return {
				isSuccess: false,
				predictedAnnotations: [],
			};
		} catch (error) {
			// Handle errors, such as network issues or API errors
			return {
				isSuccess: false,
				predictedAnnotations: [],
			};
		}
	}
}
