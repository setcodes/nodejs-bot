import { Markup, Scenes } from 'telegraf';
import { ILoggerService } from '../../logger/logger.service.interface';
import { IUserService } from '../../user/interfaces';
import { IContext } from '../interfaces';
import { BaseSceneController } from './base.scene.controller';

export class StartSceneController extends BaseSceneController {
	private loggerService: ILoggerService;

	constructor(scene: Scenes.BaseScene<IContext>, loggerService: ILoggerService) {
		super(scene);
		this.loggerService = loggerService;

		//binding
		this.bindEvent([{ method: 'hears', text: 'Обучение', func: this.goToEduScene }]);

		//calls baseScene method
		this.enter(
			'Выберите интересующий раздел',
			Markup.keyboard([['Обучение'], ['Семинары и совещания'], ['Справка']])
				.oneTime()
				.resize(),
		);
	}

	async goToEduScene(ctx: IContext): Promise<void> {
		this.loggerService.warn('educationScene');
		this.swithScene(ctx, 'educationScene');
	}
}
