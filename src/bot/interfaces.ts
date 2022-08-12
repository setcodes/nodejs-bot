import { Context, Scenes } from 'telegraf';

export interface ISessionScene extends Scenes.SceneSessionData {}
export interface ISession extends Scenes.SceneSession<ISessionScene> {}
export interface IContext extends Context {
    props: string;
    session: ISession;
    scene: Scenes.SceneContextScene<IContext, ISessionScene>;
}
