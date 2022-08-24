import { StartSceneController } from '../controllers/start.scene.controller';
import { EducationSceneController } from '../controllers/education.scene.controller';

export const dataScenes = {
	startScene: {
		sceneName: 'startScene',
		controller: StartSceneController,
		services: ['loggerService', 'userService'],
	},
	eduScene: {
		sceneName: 'educationScene',
		controller: EducationSceneController,
		services: ['loggerService', 'userService'],
	},
};
