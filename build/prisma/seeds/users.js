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
exports.Users = void 0;
const client_1 = require("@prisma/client");
const constants_1 = require("./constants");
class Users {
    constructor(loggerService) {
        this.loger = loggerService;
        this.prisma = new client_1.PrismaClient();
    }
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.prisma.$connect();
                yield this.prisma.user.create({ data: user });
                yield this.prisma.$disconnect();
                this.loger.log(constants_1.SUCCES_SEED);
            }
            catch (e) {
                if (e instanceof Error) {
                    this.loger.log(constants_1.ERROR_SEED);
                    throw new Error(e.message);
                }
            }
        });
    }
}
exports.Users = Users;
