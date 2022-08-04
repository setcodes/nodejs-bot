import {config} from 'dotenv';
import {Telegraf} from 'telegraf';
import {PrismaClient} from '@prisma/client';
import {printError, printProcess, printSuccess} from './services/log.service.js';

const tgToken = config().parsed?.TG_TOKEN;
const prisma = new PrismaClient();

const init = async () => {
    if (!tgToken) {
        printError('token incorrectly or is missing');
        throw new Error('token incorrectly or is missing');
    }
    printSuccess('token valid');
    await prisma.$connect().catch( (e: unknown) => {
        printError('database connection error');
        throw new Error('database connection error');
    });
    printSuccess('database connected');
    printProcess('bot is running...');
}

const bot = new Telegraf(<string>tgToken);

init();

bot.command('start', (ctx) => {
    ctx.reply( `Приветствую, ${ctx.message.from.first_name ?? ctx.message.from.username}!`);
})
bot.on('text', (ctx) => {
    ctx.reply('Пока я умею обрабатывать только команду /start');
});
bot.launch();
