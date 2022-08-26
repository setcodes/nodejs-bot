import { LoggerService } from '../../src/logger/logger.service';
import { CatsCourses } from './catsCourses';

const categories = [
	{ name: 'метрология и стандартизация' },
	{ name: 'газификация' },
	{ name: 'производственная безопастность' },
	{ name: 'программное обеспечение' },
];

const generate = async (): Promise<void> => {
	const logger = new LoggerService();
	const catsCourses = new CatsCourses(logger);

	await catsCourses.createCategoryCourse(categories);
};
generate();
