import { StartSceneController } from '../controllers/start.scene.controller';
import { EduSceneController } from '../controllers/edu.scene.controller';

export const dataScenes = {
	startScene: {
		sceneName: 'startScene',
		controller: StartSceneController,
		services: ['loggerService', 'userService'],
	},
	eduScene: {
		sceneName: 'eduScene',
		controller: EduSceneController,
		services: ['loggerService', 'userService'],
	},
};
