"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigService = void 0;
const dotenv_1 = require("dotenv");
const constants_1 = require("./constants");
class ConfigService {
    constructor(loggerService) {
        this.logger = loggerService;
    }
    get(key) {
        const dotenvParse = (0, dotenv_1.config)().parsed;
        if (!dotenvParse) {
            throw new Error(constants_1.ERROR_CONFIG_LOAD);
        }
        this.logger.log(constants_1.SUCCESS_CONFIG_LOAD);
        return dotenvParse[key];
    }
}
exports.ConfigService = ConfigService;
