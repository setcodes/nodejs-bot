import { Container, ContainerModule, interfaces } from 'inversify';
import { BotModule } from './bot/bot.module';
import { BotService } from './bot/services/bot.service';
import { ConfigService } from './config/config.service';
import { PrismaService } from './db/prisma.service';
import { LoggerService } from './logger/logger.service';
import { ILoggerService } from './logger/logger.service.interface';
import { UserService } from './user/user.service';
import { TYPES } from './types';
import { IUserRepository, IUserService } from './user/interfaces';
import { UserRepository } from './user/user.repository';

export const appBinding = new ContainerModule((bind: interfaces.Bind) => {
	bind<ILoggerService>(TYPES.LoggerService).to(LoggerService).inSingletonScope();
	bind<ConfigService>(TYPES.ConfigService).to(ConfigService).inSingletonScope();
	bind<PrismaService>(TYPES.PrismaService).to(PrismaService).inSingletonScope();
	bind<BotService>(TYPES.BotService).to(BotService).inSingletonScope();
	bind<IUserService>(TYPES.UserService).to(UserService).inSingletonScope();
	bind<IUserRepository>(TYPES.UserRepository).to(UserRepository).inSingletonScope();
	bind<BotModule>(TYPES.BotModule).to(BotModule).inSingletonScope();
});

const bootstrap = async (): Promise<void> => {
	const appContainer = new Container();
	appContainer.load(appBinding);

	const bot = appContainer.get<BotModule>(TYPES.BotModule);
	await bot.init();
};

bootstrap();
