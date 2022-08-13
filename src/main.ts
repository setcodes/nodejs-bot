import { Container, ContainerModule, interfaces } from 'inversify';
import { Bot } from './bot';
import { BotService } from './bot/bot.service';
import { ConfigService } from './config/config.service';
import { PrismaService } from './db/prisma.service';
import { LoggerService } from './logger/logger.service';
import { ILoggerService } from './logger/logger.service.interface';
import { TYPES } from './types';

export const appBinding = new ContainerModule((bind: interfaces.Bind) => {
	bind<ILoggerService>(TYPES.LoggerService).to(LoggerService);
	bind<ConfigService>(TYPES.ConfigService).to(ConfigService);
	bind<PrismaService>(TYPES.PrismaService).to(PrismaService);
	bind<BotService>(TYPES.BotService).to(BotService);
	bind<Bot>(TYPES.Bot).to(Bot);
});

const bootstrap = async (): Promise<void> => {
	const appContainer = new Container();
	appContainer.load(appBinding);

	const bot = appContainer.get<Bot>(TYPES.Bot);
	await bot.init();
};

bootstrap();
