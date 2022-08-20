import { inject, injectable } from 'inversify';
import { PrismaService } from '../db/prisma.service';
import { TYPES } from '../types';
import { BotService } from './services/bot.service';
import 'reflect-metadata';

@injectable()
export class BotModule {
	private _bot: BotService;

	constructor(
		@inject(TYPES.PrismaService) private prismaService: PrismaService,
		@inject(TYPES.BotService) private botService: BotService,
	) {
		this._bot = botService;
	}

	public async init(): Promise<void> {
		await this.prismaService.connect();
		await this._bot.run();
	}
}
