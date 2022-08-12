import { Bot } from './bot';
import { BotServices } from './bot/bot.service';
import { ConfigService } from './config/config.service';
import { PrismaService } from './db/prisma.service';
import { LoggerService } from './logger/logger.service';

const bootstrap = async () => {
    const loggerService = new LoggerService();
    const configService = new ConfigService(loggerService);
    const prismaService = new PrismaService(loggerService);

    const bot = new Bot(loggerService, configService, prismaService);
    bot.init();
};

bootstrap();
