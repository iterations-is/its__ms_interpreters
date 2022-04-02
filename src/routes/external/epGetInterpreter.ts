import { Request, Response } from 'express';
import { prisma } from '../../utils';

export const epGetInterpreter = async (req: Request, res: Response) => {
	const interpreterName = req.params.interpreterName;
	const interpreterVersion = req.params.interpreterVersion;

	try {
		const interpreter = await prisma.interpret.findFirst({
			where: {
				name: interpreterName,
				version: interpreterVersion,
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
