import { config, DotenvConfigOutput, DotenvParseOutput } from 'dotenv';
import { inject, injectable } from 'inversify';
import { LoggerService } from '../logger/logger.service';
import { ERROR_CONFIG_LOAD, SUCCESS_CONFIG_LOAD } from './constants';
import { IConfigService } from './config.service.interface';
import 'reflect-metadata';
import { TYPES } from '../types';

@injectable()
export class ConfigService implements IConfigService {
	private config: DotenvParseOutput;
	constructor(@inject(TYPES.LoggerService) private loggerService: LoggerService) {
		const dotenvParse: DotenvConfigOutput = config();
		if (dotenvParse.error) {
			this.loggerService.error(ERROR_CONFIG_LOAD);
			throw new Error(ERROR_CONFIG_LOAD);
		} else {
			this.config = dotenvParse.parsed as DotenvParseOutput;
		}
	}
	get(key: string): string {
		this.loggerService.log(SUCCESS_CONFIG_LOAD);
		return this.config[key];
	}
}
