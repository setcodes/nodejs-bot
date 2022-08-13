import { PrismaClient } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { LoggerService } from '../logger/logger.service';
import { SUCCESS_DB_CONNECTION, ERROR_DB_CONNECTION, CLOSE_DB_CONNECTION } from './constants';
import { IPrismaService } from './prisma.service.interface';
import 'reflect-metadata';
import { TYPES } from '../types';

@injectable()
export class PrismaService implements IPrismaService {
	client: PrismaClient;

	constructor(@inject(TYPES.LoggerService) private loggerService: LoggerService) {
		this.client = new PrismaClient();
	}

	public async connect(): Promise<void> {
		try {
			await this.client.$connect();
			this.loggerService.log(SUCCESS_DB_CONNECTION);
		} catch (e) {
			if (e instanceof Error) {
				this.loggerService.error(ERROR_DB_CONNECTION);
				this.disconnect();
				throw new Error(e.message);
			}
		}
	}

	public async disconnect(): Promise<void> {
		try {
			await this.client.$disconnect();
			this.loggerService.warn(CLOSE_DB_CONNECTION);
		} catch (e) {
			if (e instanceof Error) {
				throw new Error(e.message);
			}
		}
	}
}
