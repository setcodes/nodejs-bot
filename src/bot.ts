import { inject, injectable } from 'inversify';
import { BotService } from './bot/bot.service';
import { ConfigService } from './config/config.service';
import { PrismaService } from './db/prisma.service';
import { LoggerService } from './logger/logger.service';
import 'reflect-metadata';
import { TYPES } from './types';

@injectable()
export class Bot {
	constructor(
		@inject(TYPES.LoggerService) private loggerService: LoggerService,
		@inject(TYPES.ConfigService) private configService: ConfigService,
		@inject(TYPES.PrismaService) private prismaService: PrismaService,
		@inject(TYPES.BotService) private botService: BotService,
	) {}

	public async init(): Promise<void> {
		await this.prismaService.connect();
		this.botService.run();
	}
}
