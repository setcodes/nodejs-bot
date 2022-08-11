import { config, DotenvParseOutput } from 'dotenv';
import { LoggerService } from '../logger/logger.service';
import { ERROR_CONFIG_LOAD, SUCCESS_CONFIG_LOAD } from './constants';

export class ConfigService {
    logger: LoggerService;

    constructor(loggerService: LoggerService) {
        this.logger = loggerService;
    }
    get(key: string): string {
        const dotenvParse = config().parsed;
        if (!dotenvParse) {
            throw new Error(ERROR_CONFIG_LOAD);
        }
        this.logger.log(SUCCESS_CONFIG_LOAD);
        return dotenvParse[key];
    }
}
