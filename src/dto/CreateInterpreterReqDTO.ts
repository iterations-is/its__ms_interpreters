import Joi from 'joi';

export interface CreateInterpreterReqDTO {
	name: string;
	version: string;
	url: string;
}

export const CreateInterpreterReqDTOSchema: Joi.ObjectSchema = Joi.object({
	name: Joi.string().required(),
	version: Joi.string()
		.pattern(/^\d+\.\d+\.\d+$/)
		.required(),
	url: Joi.string().uri().required(),
});
