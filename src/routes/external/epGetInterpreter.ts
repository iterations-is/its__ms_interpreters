import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const epGetInterpreter = async (req: Request, res: Response) => {
	const interpreterId = req.params.interpreterId;

	try {
		const interpreter = await prisma.interpret.findUnique({
			where: {
				id: interpreterId,
			},
		});

		if (interpreter) {
			return res.status(200).json({ message: 'interpreter', payload: interpreter });
		} else {
			return res.status(404).json({ message: 'interpreter not found' });
		}
	} catch (error) {
		return res.status(500).json({ message: 'internal server error' });
	}
};
