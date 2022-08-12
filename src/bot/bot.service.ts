import { Markup, Scenes, Telegraf } from 'telegraf';
import { ConfigService } from '../config/config.service';
import { LoggerService } from '../logger/logger.service';
import { ERROR_TG_TOKEN, SUCCESS_BOT_IS_RUNNING } from './constants';
import { IContext } from './interfaces';
import LocalSession from 'telegraf-session-local';
import { eduScene } from './scenes/edu.scene';

export class BotServices {
    logger: LoggerService;
    bot: Telegraf<IContext>;
    token: string;
    stage: Scenes.Stage<IContext>;

    constructor(loggerService: LoggerService, configService: ConfigService) {
        this.logger = loggerService;
        this.token = configService.get('TG_TOKEN');
        this.bot = new Telegraf<IContext>(this.token);
        this.stage = new Scenes.Stage<IContext>([eduScene]);
    }

    run() {
        if (!this.token) {
            this.logger.error(ERROR_TG_TOKEN);
            throw new Error(ERROR_TG_TOKEN);
        }

        this.bot.use(
            new LocalSession({ database: 'session.json' }).middleware()
        );
        this.bot.use(this.stage.middleware());
        this.bot.command('start', async (ctx: IContext) => {
            return await ctx.reply(
                'Выберите интересующий раздел',
                Markup.keyboard([
                    ['Обучение'],
                    ['Семинары и совещания'],
                    ['Справка'],
                ])
                    .oneTime()
                    .resize()
            );
        });
        this.bot.hears('Обучение', (ctx: IContext) => {
            ctx.scene.enter('eduScene');
        });

        this.bot.on('text', (ctx: IContext) => {
            ctx.reply('Используйте команду /start чтобы начать работу с ботом');
        });

        this.logger.log(SUCCESS_BOT_IS_RUNNING);
        this.bot.launch();
    }
    stop() {
        this.bot.stop;
    }
}
