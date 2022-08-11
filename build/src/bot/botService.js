"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BotServices = void 0;
const telegraf_1 = require("telegraf");
const constants_1 = require("./constants");
class BotServices {
    constructor(loggerService, configService) {
        this.logger = loggerService;
        this.token = configService.get('TG_TOKEN');
        if (!this.token) {
            this.logger.error(constants_1.ERROR_TG_TOKEN);
            throw new Error(constants_1.ERROR_TG_TOKEN);
        }
        this.bot = new telegraf_1.Telegraf(this.token);
    }
    run() {
        this.bot.command('start', (ctx) => {
            var _a;
            ctx.reply(`Приветствую, ${(_a = ctx.message.from.first_name) !== null && _a !== void 0 ? _a : ctx.message.from.username}!`);
        });
        this.bot.on('text', (ctx) => {
            ctx.reply('Пока я умею обрабатывать только команду /start');
        });
        this.logger.log(constants_1.SUCCESS_BOT_IS_RUNNING);
        this.bot.launch();
    }
}
exports.BotServices = BotServices;
