import { BotServices } from './bot/bot.service';
import { ConfigService } from './config/config.service';
import { PrismaService } from './db/prisma.service';
import { LoggerService } from './logger/logger.service';

export class Bot {
    logger: LoggerService;
    config: ConfigService;
    bot: BotServices;
    prisma: PrismaService;

    constructor(
        loggerService: LoggerService,
        configService: ConfigService,
        prismaService: PrismaService
    ) {
        this.logger = loggerService;
        this.config = configService;
        this.bot = new BotServices(loggerService, configService);
        this.prisma = prismaService;
    }

    async init() {
        await this.prisma.connect();
        this.bot.run();
    }
}
