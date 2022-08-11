import { PrismaClient } from '@prisma/client';
import { LoggerService } from '../logger/logger.service';
import {
    SUCCESS_DB_CONNECTION,
    ERROR_DB_CONNECTION,
    CLOSE_DB_CONNECTION,
} from './constants';
import { IPrismaService } from './prisma.service.interface';

export class PrismaService implements IPrismaService {
    client: PrismaClient;
    logger: LoggerService;

    constructor(loggerService: LoggerService) {
        this.client = new PrismaClient();
        this.logger = loggerService;
    }

    public async connect(): Promise<void> {
        try {
            await this.client.$connect();
            this.logger.log(SUCCESS_DB_CONNECTION);
        } catch (e) {
            if (e instanceof Error) {
                this.logger.error(ERROR_DB_CONNECTION);
                this.disconnect();
                throw new Error(e.message);
            }
        }
    }

    public async disconnect(): Promise<void> {
        try {
            await this.client.$disconnect();
            this.logger.warn(CLOSE_DB_CONNECTION);
        } catch (e) {
            if (e instanceof Error) {
                throw new Error(e.message);
            }
        }
    }
}
