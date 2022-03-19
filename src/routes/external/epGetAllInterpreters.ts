import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const epGetAllInterpreters = async (req: Request, res: Response) => {
	try {
		const interpreters = await prisma.interpret.findMany();

		return res.status(200).json({ message: 'all interpreters', payload: { interpreters } });
	} catch (error) {
		return res.status(500).json({ message: 'internal server error' });
	}
};
