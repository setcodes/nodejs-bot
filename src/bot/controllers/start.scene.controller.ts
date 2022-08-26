import { Markup, Scenes } from 'telegraf';
import { ILoggerService } from '../../logger/logger.service.interface';
import { IContext } from '../interfaces';
import { BaseSceneController } from './base.scene.controller';

export class StartSceneController extends BaseSceneController {
	private loggerService: ILoggerService;

	constructor(scene: Scenes.BaseScene<IContext>, loggerService: ILoggerService) {
		super(scene);
		this.loggerService = loggerService;

		//binding
		this.bindEvent([{ method: 'hears', text: 'Обучение', func: this.goToEducationScene }]);
		this.bindEvent([
			{ method: 'hears', text: 'Семинары и совещания', func: this.goToMeetingScene },
		]);
		this.bindEvent([{ method: 'hears', text: 'Информация', func: this.goToInformationScene }]);

		//calls baseScene method
		this.enter(
			'Выберите интересующий раздел',
			Markup.keyboard([['Обучение'], ['Семинары и совещания'], ['Информация']])
				.oneTime()
				.resize(),
		);
	}

	async goToEducationScene(ctx: IContext): Promise<void> {
		this.loggerService.warn('educationScene');
		this.swithScene(ctx, 'educationScene');
	}
	async goToMeetingScene(ctx: IContext): Promise<void> {
		this.loggerService.warn('meetingScene');
		this.swithScene(ctx, 'meetingScene');
	}
	async goToInformationScene(ctx: IContext): Promise<void> {
		this.loggerService.warn('informationScene');
		this.swithScene(ctx, 'informationScene');
	}
}
