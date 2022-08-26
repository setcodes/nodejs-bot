import { UserModel } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { ILoggerService } from '../logger/logger.service.interface';
import { TYPES } from '../types';
import { WARN_USER_ALLREADY_IN_DB, INFO_USER_CREATED, WARN_USER_NOT_FOUND } from './constants';
import { UserDto } from './dto/user.dto';
import { IUserRepository, IUserService } from './interfaces';
import { User } from './user.entity';

@injectable()
export class UserService implements IUserService {
	constructor(
		@inject(TYPES.UserRepository) private readonly userRepository: IUserRepository,
		@inject(TYPES.LoggerService) private readonly loggerService: ILoggerService,
	) {}

	async createUser({
		id,
		isBot,
		username,
		firstName,
		lastName,
	}: UserDto): Promise<UserModel | null> {
		const newUser = new User(id, isBot, username, firstName, lastName);
		const existedUser = await this.userRepository.findById(id);
		if (existedUser) {
			this.loggerService.log(WARN_USER_ALLREADY_IN_DB);
			return null;
		}
		this.loggerService.warn(WARN_USER_NOT_FOUND);
		this.loggerService.log(INFO_USER_CREATED);
		return await this.userRepository.createUser(newUser);
	}
	async findUser(id: number): Promise<UserModel | null> {
		if (!id) {
			return null;
		}
		return this.userRepository.findById(id);
	}
}
