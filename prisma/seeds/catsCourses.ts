import { PrismaClient } from '@prisma/client';
import { LoggerService } from '../../src/logger/logger.service';
import { ERROR_SEED, SUCCES_SEED } from './constants';
import { ICatsCourses } from './interfaces/cats.courses.interface';

export class CatsCourses {
	loger: LoggerService;
	prisma: PrismaClient;

	constructor(loggerService: LoggerService) {
		this.loger = loggerService;
		this.prisma = new PrismaClient();
	}

	async createCategoryCourse(categories: ICatsCourses[]): Promise<void> {
		try {
			await this.prisma.$connect();
			await this.prisma.categoriesCoursesModel.createMany({ data: categories });
			await this.prisma.$disconnect();
			this.loger.log(SUCCES_SEED);
		} catch (e: unknown) {
			if (e instanceof Error) {
				this.loger.log(ERROR_SEED);
				throw new Error(e.message);
			}
		}
	}
}
