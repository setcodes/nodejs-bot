import { Markup, Scenes } from 'telegraf';
import { IContext } from '../interfaces';

export const eduScene = new Scenes.BaseScene<IContext>('eduScene');
eduScene.enter((ctx) => {
	ctx.reply(
		'Вы перешли на сцену обучения',
		Markup.keyboard([['Назад']])
			.oneTime()
			.resize(),
	);
});
eduScene.hears('Назад', (ctx: IContext) => {
	ctx.scene.enter('startScene');
});
