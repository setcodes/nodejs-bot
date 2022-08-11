import { Telegraf } from 'telegraf';
import { ConfigService } from '../config/config.service';
import { LoggerService } from '../logger/logger.service';
import { ERROR_TG_TOKEN, SUCCESS_BOT_IS_RUNNING } from './constants';

export class BotServices {
    logger: LoggerService;
    bot: Telegraf;
    token: string;

    constructor(loggerService: LoggerService, configService: ConfigService) {
        this.logger = loggerService;
        this.token = configService.get('TG_TOKEN');
        if (!this.token) {
            this.logger.error(ERROR_TG_TOKEN);
            throw new Error(ERROR_TG_TOKEN);
        }
        this.bot = new Telegraf(this.token);
    }

    run() {
        this.bot.command('start', (ctx: any) => {
            ctx.reply(
                `Приветствую, ${
                    ctx.message.from.first_name ?? ctx.message.from.username
                }!`
            );
        });

        this.bot.on('text', (ctx: any) => {
            ctx.reply('Пока я умею обрабатывать только команду /start');
        });

        this.logger.log(SUCCESS_BOT_IS_RUNNING);
        this.bot.launch();
    }
}
