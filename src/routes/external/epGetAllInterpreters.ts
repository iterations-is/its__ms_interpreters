import { Request, Response } from 'express';
import { prisma } from '../../utils';

interface IntVersionData {
	id: string;
	version: string;
	url: string;
}

export const epGetAllInterpreters = async (req: Request, res: Response) => {
	try {
		const interpreters = await prisma.interpret.findMany();
		const grouped: { [key: string]: IntVersionData[] } = {};

		interpreters.forEach(({ id, name, version, url }) => {
			if (!grouped[name]) grouped[name] = [];
			const data: IntVersionData = {
				id,
				version,
				url,
			};
			grouped[name].push(data);
		});

		return res.status(200).json({ message: 'all interpreters', payload: grouped });
	} catch (error) {
		return res.status(500).json({ message: 'internal server error' });
	}
};
