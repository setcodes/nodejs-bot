import {PrismaClient} from '@prisma/client';
import {printSuccess} from '../src/services/log.service.js';

const prisma = new PrismaClient();

const user = {
    username: 'testUser',
    first_name: 'Bot',
    last_name: 'Botov',
}

const createUser = async() => {
    try {
        await prisma.$connect();
        await prisma.user.create({data: user});
        await prisma.$disconnect();
        printSuccess('Seed completed');
    } catch (e:unknown) {
        throw new Error('Seed failed');
    }
}
createUser();
