import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const epDeleteInterpreter = async (req: Request, res: Response) => {
	const interpreterId = req.params.interpreterId;

	try {
		await prisma.interpret.deleteMany({
			where: {
				id: interpreterId,
			},
		});

		return res.status(200).json({ message: 'the interpret was deleted' });
	} catch (error) {
		return res.status(500).json({ message: 'internal server error' });
	}
};
