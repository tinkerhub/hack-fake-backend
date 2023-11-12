import {Joi} from "celebrate";

import {uuidv4Schema} from "@validations/genericSchemas";

const newsIdSchema = uuidv4Schema.required();

const newsSubmissionBodySchema = Joi.object({
	title: Joi.string().min(1).required(),
	content: Joi.string().min(1).required(),
	url: Joi.string().uri().required(),
	date: Joi.string().isoDate().required(),
});

export {newsIdSchema, newsSubmissionBodySchema};
