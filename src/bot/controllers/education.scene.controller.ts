import { Markup, Scenes } from 'telegraf';
import { ILoggerService } from '../../logger/logger.service.interface';
import { ERROR_USER_ID, ERROR_USER_NOT_FOUND } from '../../user/constants';
import { IUserService } from '../../user/interfaces';
import { IContext } from '../interfaces';
import { BaseSceneController } from './base.scene.controller';

export class EducationSceneController extends BaseSceneController {
	private loggerService: ILoggerService;
	private userService: IUserService;

	constructor(
		scene: Scenes.BaseScene<IContext>,
		loggerService: ILoggerService,
		userService: IUserService,
	) {
		super(scene);
		this.loggerService = loggerService;
		this.userService = userService;

		//binding
		this.bindEvent([
			{ method: 'hears', text: 'Назад', func: this.backScene },
			{ method: 'hears', text: 'Программы', func: this.sendReplyProgramms },
		]);

		//calls baseScene method
		this.enter(
			'Выберите интересующий раздел',
			Markup.keyboard([['Программы'], ['Запись на обучение'], ['Справка', 'Назад']])
				.oneTime()
				.resize(),
		);
	}
	async sendReplyProgramms(ctx: IContext): Promise<void> {
		const userId = ctx.from?.id;
		if (!userId) {
			this.loggerService.error(ERROR_USER_ID);
			return;
		}
		const user = await this.userService.findUser(userId as number);
		if (!user) {
			this.loggerService.error(ERROR_USER_NOT_FOUND);
		}

		const userName = user?.firstName;
		ctx.reply(`${userName}, твое имя взято из БД, а программы я добавлю в следующем ПР :)`);
	}
	backScene(ctx: IContext): void {
		this.swithScene(ctx, 'startScene');
	}
}
