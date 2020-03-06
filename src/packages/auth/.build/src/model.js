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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_lambda_1 = require("apollo-server-lambda");
const jsonwebtoken_1 = require("jsonwebtoken");
const constants_1 = require("./constants");
const entity_1 = require("./entity");
const util_1 = require("./util");
const config_1 = __importDefault(require("../config"));
const config = config_1.default();
class UserModel extends entity_1.User {
    static createUser(email, password, first_name, last_name, company) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepository = yield util_1.openRepository(entity_1.User);
            const userToBeSaved = new entity_1.User();
            userToBeSaved.first_name = first_name;
            userToBeSaved.last_name = last_name;
            userToBeSaved.email = email;
            userToBeSaved.company = company || '';
            userToBeSaved.is_active = true;
            userToBeSaved.hashPassword(password);
            return userRepository.save(userToBeSaved);
        });
    }
    static listUser(id, email, first_name, last_name, company, is_active) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepository = yield util_1.openRepository(entity_1.User);
            const like_queries = util_1.generateLikeQuery({
                email,
                first_name,
                last_name,
                company,
            });
            const exact_queries = util_1.generateExactQuery({
                id,
                is_active,
            });
            const userList = yield userRepository.find({
                where: Object.assign(Object.assign({}, exact_queries), like_queries),
            });
            return userList;
        });
    }
    static updateUser(id, email, password, first_name, last_name, company, is_active) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepository = yield util_1.openRepository(entity_1.User);
            const userToBeUpdated = yield userRepository.findOne(+id || 0);
            if (!userToBeUpdated) {
                throw new apollo_server_lambda_1.ApolloError('The user does not exist.', constants_1.HttpStatus.E_400);
            }
            const fields = {
                email,
                password,
                first_name,
                last_name,
                company,
                is_active,
            };
            Object.entries(fields)
                .filter(entry => entry[0] !== undefined)
                .map(entry => {
                const [field_name, value] = entry;
                userToBeUpdated[field_name] = value;
            });
            return userRepository.save(userToBeUpdated);
        });
    }
    static retrieveUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepository = yield util_1.openRepository(entity_1.User);
            const userToBeRetrieved = yield userRepository.findOne(+id || 0);
            if (!userToBeRetrieved) {
                throw new apollo_server_lambda_1.ApolloError('The user does not exist.', constants_1.HttpStatus.E_400);
            }
            return userToBeRetrieved;
        });
    }
    static removeUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepository = yield util_1.openRepository(entity_1.User);
            const userToBeRemoved = yield userRepository.findOne(+id || 0);
            if (!userToBeRemoved) {
                throw new apollo_server_lambda_1.ApolloError('The user does not exist.', constants_1.HttpStatus.E_400);
            }
            return userRepository.remove(userToBeRemoved);
        });
    }
    generateToken(scopes) {
        const header = {
            algorithm: config.jwtAlgorithm,
            expiresIn: '30d',
            audience: config.jwtAudience,
            issuer: config.jwtIssuer,
        };
        const payload = {
            id: this.id,
            scopes,
        };
        return jsonwebtoken_1.sign(payload, config.jwtSecret, header);
    }
}
exports.UserModel = UserModel;
//# sourceMappingURL=model.js.map