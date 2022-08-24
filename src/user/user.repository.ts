import { UserModel } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { PrismaService } from '../db/prisma.service';
import { TYPES } from '../types';
import { IUserRepository } from './interfaces';
import { User } from './user.entity';

@injectable()
export class UserRepository implements IUserRepository {
	constructor(@inject(TYPES.PrismaService) private readonly prismaService: PrismaService) {}

	async createUser({ id, isBot, username, firstName, lastName }: User): Promise<UserModel> {
		return await this.prismaService.client.userModel.create({
			data: {
				id,
				isBot,
				username,
				firstName,
				lastName,
			},
		});
	}
	async findById(id: number): Promise<UserModel | null> {
		return await this.prismaService.client.userModel.findFirst({
			where: {
				id,
			},
		});
	}
}
