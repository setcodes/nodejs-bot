import { Logger } from 'tslog';
import { ILoggerService } from './logger.service.interface';

export class LoggerService implements ILoggerService {
    private logger: Logger;

    constructor() {
        this.logger = new Logger({
            displayLoggerName: false,
            displayInstanceName: false,
            displayFilePath: 'hidden',
            displayFunctionName: false,
        });
    }

    log(...args: unknown[]) {
        this.logger.info(...args);
    }

    error(...args: unknown[]) {
        this.logger.error(...args);
    }

    warn(...args: unknown[]) {
        this.logger.warn(...args);
    }
}
