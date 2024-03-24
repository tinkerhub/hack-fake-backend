import {asTypeIServiceError} from "@customTypes/commonServiceTypes";

const newsServiceError = asTypeIServiceError({
	generic: {
		NewsDoesNotExists: {
			error: "NewsDoesNotExists",

			message: "News doesn't exists",
		},
	},

	annotateNews: {
		InvalidAnnotation: {
			error: "InvalidAnnotation",

			message: "Invalid annotation options",
		},
	},
});

export {newsServiceError};
