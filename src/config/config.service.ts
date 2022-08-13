import { config, DotenvParseOutput } from 'dotenv';
import { inject, injectable } from 'inversify';
import { LoggerService } from '../logger/logger.service';
import { ERROR_CONFIG_LOAD, SUCCESS_CONFIG_LOAD } from './constants';
import 'reflect-metadata';
import { TYPES } from '../types';

@injectable()
export class ConfigService {
    constructor(
        @inject(TYPES.LoggerService) private loggerService: LoggerService
    ) {}
    get(key: string): string {
        const dotenvParse = config().parsed;
        if (!dotenvParse) {
            throw new Error(ERROR_CONFIG_LOAD);
        }
        this.loggerService.log(SUCCESS_CONFIG_LOAD);
        return dotenvParse[key];
    }
}
