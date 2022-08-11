import { PrismaClient } from '@prisma/client';
import { LoggerService } from '../../src/logger/logger.service';
import { ERROR_SEED, SUCCES_SEED } from './constants';
import { IUser } from './interfaces/user.interface';

export class Users {
    loger: LoggerService;
    prisma: PrismaClient;

    constructor(loggerService: LoggerService) {
        this.loger = loggerService;
        this.prisma = new PrismaClient();
    }

    async createUser(user: IUser): Promise<void> {
        try {
            await this.prisma.$connect();
            await this.prisma.user.create({ data: user });
            await this.prisma.$disconnect();
            this.loger.log(SUCCES_SEED);
        } catch (e: unknown) {
            if (e instanceof Error) {
                this.loger.log(ERROR_SEED);
                throw new Error(e.message);
            }
        }
    }
}
