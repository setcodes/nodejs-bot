import { Scenes, Telegraf } from 'telegraf';
import { IContext } from '../interfaces';

export abstract class BaseBotScene {
    scene: Scenes.BaseScene<IContext>;

    constructor(scene: Scenes.BaseScene<IContext>, bot: Telegraf<IContext>) {
        this.scene = scene;
    }
}
