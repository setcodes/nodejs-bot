import { StartSceneController } from '../controllers/start.scene.controller';
import { MeetingSceneController } from '../controllers/meeting.scene.controller';
import { InformationSceneController } from '../controllers/information.scene.controller';
import { EducationSceneController } from '../controllers/education.scene.controller';

export const dataScenes = {
	startScene: {
		sceneName: 'startScene',
		controller: StartSceneController,
		services: ['loggerService', 'userService'],
	},
	educationScene: {
		sceneName: 'educationScene',
		controller: EducationSceneController,
		services: ['loggerService', 'userService'],
	},
	meetingScene: {
		sceneName: 'educationScene',
		controller: MeetingSceneController,
		services: ['loggerService'],
	},
	informationScene: {
		sceneName: 'educationScene',
		controller: InformationSceneController,
		services: ['loggerService'],
	},
};
