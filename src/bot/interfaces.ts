import { Context, Scenes } from 'telegraf';

export type ISessionScene = Scenes.SceneSessionData;
export type ISession = Scenes.SceneSession<ISessionScene>;
export interface IContext extends Context {
	props: string;
	session: ISession;
	scene: Scenes.SceneContextScene<IContext, ISessionScene>;
}
