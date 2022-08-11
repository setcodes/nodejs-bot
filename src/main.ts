import { BotServices } from './bot/botService';
import { ConfigService } from './config/config.service';
import { PrismaService } from './db/prisma.service';
import { LoggerService } from './logger/logger.service';

const bootstrap = async () => {
    const loggerService = new LoggerService();
    const configService = new ConfigService(loggerService);
    const botService = new BotServices(loggerService, configService);
    const db = new PrismaService(loggerService);

    await db.connect();
    botService.run();
};

bootstrap();
