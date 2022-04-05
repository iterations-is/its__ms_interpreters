import { Request, Response } from 'express';

import { CreateInterpreterReqDTO, CreateInterpreterReqDTOSchema } from '../../dto';
import { prisma } from '../../utils';
import { MessageDTO } from '@its/ms';

export const epCreateInterpreter = async (req: Request, res: Response) => {
	// Validation
	const createInterpretReq: CreateInterpreterReqDTO = req.body;
	const { error } = CreateInterpreterReqDTOSchema.validate(createInterpretReq);
	if (error) return res.status(400).json({ code: 'VALIDATION', payload: error } as MessageDTO);

	// Create
	try {
		const interpreter = await prisma.interpret.findFirst({
			where: {
				name: createInterpretReq?.name,
				version: createInterpretReq?.version,
			},
		});

		if (!interpreter) {
			const inter = await prisma.interpret.create({
				data: {
					name: createInterpretReq.name,
					version: createInterpretReq.version,
					url: createInterpretReq.url,
				},
			});

			return res.status(200).json({
				message: `interpreter ${inter.name}@${inter.version} was created`,
				code: 'INTERPRETER_CREATED',
			});
		} else {
			// Update existing
			await prisma.interpret.update({
				where: {
					id: interpreter.id,
				},
				data: {
					name: createInterpretReq.name,
					version: createInterpretReq.version,
					url: createInterpretReq.url,
				},
			});

			return res.status(200).json({
				message: `interpreter ${interpreter.name}@${interpreter.version} was updated`,
				code: 'INTERPRETER_UPDATED',
			});
		}
	} catch (error) {
		return res.status(500).json({ message: 'internal server error', payload: { error } });
	}
};
