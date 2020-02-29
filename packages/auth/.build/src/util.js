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
const database_1 = require("../database");
const typeorm_1 = require("typeorm");
function openRepository(type) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(type);
        const database = new database_1.Database();
        const dbConn = yield database.getConnection();
        return dbConn.getRepository(type);
    });
}
exports.openRepository = openRepository;
function generateExactQuery(filter) {
    return Object.entries(filter)
        .filter(entry => entry[1] !== undefined)
        .reduce((new_filter, entry) => (Object.assign({ [entry[0]]: entry[1] }, new_filter)), {});
}
exports.generateExactQuery = generateExactQuery;
function generateLikeQuery(filter) {
    return Object.entries(filter)
        .filter(entry => entry[1] !== undefined)
        .reduce((new_filter, entry) => (Object.assign({ [entry[0]]: typeorm_1.Like(entry[1]) }, new_filter)), {});
}
exports.generateLikeQuery = generateLikeQuery;
//# sourceMappingURL=util.js.map