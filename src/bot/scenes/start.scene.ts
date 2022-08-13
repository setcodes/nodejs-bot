import { Markup, Scenes } from 'telegraf';
import { IContext } from '../interfaces';

export const startScene = new Scenes.BaseScene<IContext>('startScene');
startScene.enter((ctx) => {
	ctx.reply(
		'Выберите интересующий раздел',
		Markup.keyboard([['Обучение'], ['Семинары и совещания'], ['Справка']])
			.oneTime()
			.resize(),
	);
});
startScene.hears('Обучение', (ctx: IContext) => {
	ctx.scene.enter('eduScene');
});
