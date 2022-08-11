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
const botService_1 = require("./bot/botService");
const config_service_1 = require("./config/config.service");
const prisma_service_1 = require("./db/prisma.service");
const logger_service_1 = require("./logger/logger.service");
const bootstrap = () => __awaiter(void 0, void 0, void 0, function* () {
    const loggerService = new logger_service_1.LoggerService();
    const configService = new config_service_1.ConfigService(loggerService);
    const botService = new botService_1.BotServices(loggerService, configService);
    const db = new prisma_service_1.PrismaService(loggerService);
    yield db.connect();
    botService.run();
});
bootstrap();
