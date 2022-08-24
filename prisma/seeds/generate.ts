import { LoggerService } from '../../src/logger/logger.service';
import { Users } from './users';

const userData = {
	username: 'client',
	is_bot: false,
	first_name: 'abaim',
	last_name: 'abanat',
};

const generate = async (): Promise<void> => {
	const logger = new LoggerService();
	const user = new Users(logger);

	await user.createUser(userData);
};
generate();
