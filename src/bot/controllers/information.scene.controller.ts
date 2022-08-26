import { Markup, Scenes } from 'telegraf';
import { ILoggerService } from '../../logger/logger.service.interface';
import { IContext } from '../interfaces';
import { BaseSceneController } from './base.scene.controller';

export class InformationSceneController extends BaseSceneController {
	private loggerService: ILoggerService;

	constructor(scene: Scenes.BaseScene<IContext>, loggerService: ILoggerService) {
		super(scene);
		this.loggerService = loggerService;

		//binding
		this.bindEvent([{ method: 'hears', text: 'Назад', func: this.backScene }]);

		//calls baseScene method
		this.enter(
			'Раздел в разработке...',
			Markup.keyboard([['Назад']])
				.oneTime()
				.resize(),
		);
	}
	backScene(ctx: IContext): void {
		this.swithScene(ctx, 'startScene');
	}
}
