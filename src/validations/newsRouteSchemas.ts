import {Joi} from "celebrate";

import {uuidv4Schema} from "@validations/genericSchemas";

const newsIdSchema = uuidv4Schema.required();

const newsSubmissionBodySchema = Joi.object({
	title: Joi.string().min(1).required(),
	content: Joi.string().min(1).required(),
	url: Joi.string().uri().required(),
	date: Joi.string().isoDate().required(),
});

const newsAnnotationBodySchema = Joi.object({
	newsId: Joi.string().uuid().required(),
	annotations: Joi.array().items(Joi.string().uuid()).required().min(1),
});

export {newsIdSchema, newsSubmissionBodySchema, newsAnnotationBodySchema};
