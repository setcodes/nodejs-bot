import { CategoriesCoursesModel } from '@prisma/client';
import { injectable, inject } from 'inversify';
import { PrismaService } from '../db/prisma.service';
import { TYPES } from '../types';
import { CategoriesCourses } from './categories.courses.entity';
import { ICategoriesCoursesRepository } from './interfaces';

@injectable()
export class CategoriesCoursesRepository implements ICategoriesCoursesRepository {
	constructor(@inject(TYPES.PrismaService) private readonly prismaService: PrismaService) {}

	async createCategory({ name }: CategoriesCourses): Promise<CategoriesCoursesModel> {
		return await this.prismaService.client.categoriesCoursesModel.create({
			data: {
				name,
			},
		});
	}
}
