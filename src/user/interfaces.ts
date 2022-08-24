import { UserModel } from '@prisma/client';
import { UserDto } from './dto/user.dto';
import { User } from './user.entity';

export interface IUserService {
	createUser: (dto: UserDto) => Promise<UserModel | null>;
	findUser: (id: number) => Promise<UserModel | null>;
}
export interface IUserRepository {
	createUser: (user: User) => Promise<UserModel>;
	findById: (id: number) => Promise<UserModel | null>;
}
