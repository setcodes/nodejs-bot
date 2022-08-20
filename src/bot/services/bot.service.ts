import { Scenes, Telegraf } from 'telegraf';
import { ConfigService } from '../../config/config.service';
import { LoggerService } from '../../logger/logger.service';
import { ERROR_TG_TOKEN, SUCCESS_BOT_IS_RUNNING } from '../constants';
import { IContext } from '../interfaces';
import LocalSession from 'telegraf-session-local';
import 'reflect-metadata';
import { inject, injectable } from 'inversify';
import { TYPES } from '../../types';
import { dataScenes } from '../scenes/data.scenes';
import { IUserService } from '../../user/interfaces';
import { IConfigService } from '../../config/config.service.interface';
import { ILoggerService } from '../../logger/logger.service.interface';

@injectable()
export class BotService {
	bot: Telegraf<IContext>;
	token: string;
	stage: Scenes.Stage<IContext>;
	scenesNames: any;
	scenes: Scenes.BaseScene<IContext>[];

	constructor(
		@inject(TYPES.LoggerService) private loggerService: ILoggerService,
		@inject(TYPES.ConfigService) private configService: IConfigService,
		@inject(TYPES.UserService) private userService: IUserService,
	) {
		this.token = configService.get('TG_TOKEN');
		this.bot = new Telegraf<IContext>(this.token);

		this.scenes = this.createScene(dataScenes);

		this.stage = new Scenes.Stage<IContext>(this.scenes);
		if (!this.token) {
			this.loggerService.error(ERROR_TG_TOKEN);
			throw new Error(ERROR_TG_TOKEN);
		}

		this.bot.use(new LocalSession({ database: 'session.json' }).middleware());
		this.bot.use(this.stage.middleware());
	}

	//TODO: add types dataScenes
	createScene(dataScenes: any) {
		const scenes = [];
		for (const scene in dataScenes) {
			const instanceScene = new Scenes.BaseScene<IContext>(scene);
			scenes.push(instanceScene);
			const services = this.createServices(dataScenes[scene].services);
			new dataScenes[scene].controller(instanceScene, ...services);
		}
		return scenes;
	}
	//TODO: add types result and return func
	createServices(services: string[]): any {
		const result: any = [];
		services.map((service) => {
			switch (service) {
				case 'loggerService':
					result.push(this.loggerService);
					break;
				case 'userService':
					result.push(this.userService);
					break;
				default:
					break;
			}
		});
		return result;
	}

	run(): void {
		this.bot.command('start', async (ctx: IContext) => {
			const newUser = ctx.from;
			if (newUser) {
				this.userService.createUser({
					id: newUser.id,
					isBot: newUser.is_bot,
					username: newUser.username ? newUser.username : '',
					firstName: newUser.first_name,
					lastName: newUser.last_name ? newUser.last_name : '',
				});
			}

			return await ctx.scene.enter('startScene');
		});

		this.bot.on('text', async (ctx: IContext) => {
			await ctx.reply('Используйте команду /start чтобы начать работу с ботом');
		});

		this.loggerService.log(SUCCESS_BOT_IS_RUNNING);
		this.bot.launch();
	}
	stop(): void {
		this.bot.command('stop', async (ctx: IContext) => {
			await this.bot.stop;
		});
	}
}
