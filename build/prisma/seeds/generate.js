"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_service_1 = require("../../src/logger/logger.service");
const users_1 = require("./users");
const userData = {
    username: 'client',
    first_name: 'abaim',
    last_name: 'abanat',
};
const generate = () => __awaiter(void 0, void 0, void 0, function* () {
    const logger = new logger_service_1.LoggerService();
    const user = new users_1.Users(logger);
    yield user.createUser(userData);
});
generate();
