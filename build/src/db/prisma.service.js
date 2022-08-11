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
exports.PrismaService = void 0;
const client_1 = require("@prisma/client");
const constants_1 = require("./constants");
class PrismaService {
    constructor(loggerService) {
        this.client = new client_1.PrismaClient();
        this.logger = loggerService;
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.client.$connect();
                this.logger.log(constants_1.SUCCESS_DB_CONNECTION);
            }
            catch (e) {
                if (e instanceof Error) {
                    this.logger.error(constants_1.ERROR_DB_CONNECTION);
                    this.disconnect();
                    throw new Error(e.message);
                }
            }
        });
    }
    disconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.client.$disconnect();
                this.logger.warn(constants_1.CLOSE_DB_CONNECTION);
            }
            catch (e) {
                if (e instanceof Error) {
                    throw new Error(e.message);
                }
            }
        });
    }
}
exports.PrismaService = PrismaService;
