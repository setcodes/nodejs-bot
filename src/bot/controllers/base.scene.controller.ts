import { Markup, Scenes } from 'telegraf';
import { ReplyKeyboardMarkup } from 'telegraf/typings/core/types/typegram';
import { IContext, ISceneAction } from '../interfaces';

export abstract class BaseSceneController {
	private _scene: Scenes.BaseScene<IContext>;

	constructor(scene: Scenes.BaseScene<IContext>) {
		this._scene = scene;
	}

	protected enter(msg: string, markup: Markup.Markup<ReplyKeyboardMarkup>): void {
		this._scene.enter((ctx) => {
			ctx.reply(msg, markup);
		});
	}

	protected swithScene(ctx: IContext, sceneId: string): void {
		ctx.scene.leave();
		ctx.scene.enter(sceneId);
	}

	protected bindEvent(events: ISceneAction[]): void {
		for (const event of events) {
			const handler = event.func.bind(this);
			if (event.command) {
				this._scene[event.method](event.command, handler);
			} else {
				this._scene[event.method](event.text, handler);
			}
		}
	}
}
