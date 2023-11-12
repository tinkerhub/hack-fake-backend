import {asTypeIServiceError} from "@customTypes/commonServiceTypes";

const newsServiceError = asTypeIServiceError({
	predictAnnotations: {
		NewsDoesNotExists: {
			error: "NewsDoesNotExists",

			message: "News doesn't exists",
		},
	},
});

export {newsServiceError};
