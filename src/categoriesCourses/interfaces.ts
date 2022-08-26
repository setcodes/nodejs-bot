import { CategoriesCoursesModel } from '@prisma/client';
import { CategoriesCourses } from './categories.courses.entity';
import { CategoriesCoursesDto } from './dto/categories.courses.dto';

export interface ICategoriesCoursesService {
	createCategory: (dto: CategoriesCoursesDto) => Promise<CategoriesCoursesModel | undefined>;
}
export interface ICategoriesCoursesRepository {
	createCategory: (name: CategoriesCourses) => Promise<CategoriesCoursesModel>;
}
