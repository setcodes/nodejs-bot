import { CategoriesCoursesModel } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { ILoggerService } from '../logger/logger.service.interface';
import { TYPES } from '../types';
import { CategoriesCourses } from './categories.courses.entity';
import { CategoriesCoursesDto } from './dto/categories.courses.dto';
import { ICategoriesCoursesRepository, ICategoriesCoursesService } from './interfaces';

@injectable()
export class CategoriesCoursesService implements ICategoriesCoursesService {
	constructor(
		@inject(TYPES.CategoriesCoursesRepository)
		private readonly categoriesCoursesRepository: ICategoriesCoursesRepository,
		@inject(TYPES.LoggerService) private readonly loggerService: ILoggerService,
	) {}

	async createCategory({
		name,
	}: CategoriesCoursesDto): Promise<CategoriesCoursesModel | undefined> {
		try {
			const newCategory = new CategoriesCourses(name);
			return this.categoriesCoursesRepository.createCategory(newCategory);
		} catch (error: unknown) {
			if (error instanceof Error) {
				this.loggerService.error(error.message);
				throw new Error(error.message);
			}
		}
	}
}
