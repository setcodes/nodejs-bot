import { PrismaClient } from '@prisma/client';
import { printSuccess } from '../services/log.service.js';

const prisma = new PrismaClient();

interface IUserSeed {
	username: string;
	first_name: string;
	last_name: string;
}

const user: IUserSeed = {
	username: 'testUser',
	first_name: 'Bot',
	last_name: 'Botov',
};

const createUser = async (): Promise<void> => {
	try {
		await prisma.$connect();
		await prisma.user.create({ data: user });
		await prisma.$disconnect();
		printSuccess('Seed completed');
	} catch (e: unknown) {
		if (e instanceof Error) {
			throw new Error(e.message);
		}
	}
};
createUser();
