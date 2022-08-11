// const { config } = require('dotenv');
// const { Telegraf } = require('telegraf');

// const {
//     printError,
//     printProcess,
//     printSuccess,
// } = require('./services/log.service.ts');

// const tgToken = config().parsed?.TG_TOKEN;

// // const init = async () => {
// //     if (!tgToken) {
// //         printError('token incorrectly or is missing');
// //         throw new Error('token incorrectly or is missing');
// //     }
// //     printSuccess('token valid');
// //     await prisma.$connect().catch((e: unknown) => {
// //         printError('database connection error');
// //         throw new Error('database connection error');
// //     });
// //     printSuccess('database connected');
// //     printProcess('bot is running...');
// // };

// const bot = new Telegraf(<string>tgToken);

// bot.command('start', (ctx: any) => {
//     ctx.reply(
//         `Приветствую, ${
//             ctx.message.from.first_name ?? ctx.message.from.username
//         }!`
//     );
// });
// bot.on('text', (ctx: any) => {
//     ctx.reply('Пока я умею обрабатывать только команду /start');
// });
// bot.launch();
