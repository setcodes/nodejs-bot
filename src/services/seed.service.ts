import {PrismaClient} from '@prisma/client';
import {printSuccess} from './log.service.js';

const prisma = new PrismaClient();

const user = {
    username: 'testUser',
    first_name: 'Bot',
    last_name: 'Botov',
}

const seed = async() => {
    try {
        await prisma.$connect();
        const createUser =  await prisma.user.create({data: user});
        await prisma.$disconnect();
        printSuccess('Seed completed');
    } catch (e:unknown) {
        throw new Error('Seed failed');
    }
}
seed();
