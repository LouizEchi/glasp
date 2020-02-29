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
const apollo_server_lambda_1 = require("apollo-server-lambda");
const model_1 = require("./model");
const HttpStatus = {
    E_400: 'Bad request',
};
const errorResponse = (code, error, errors) => {
    throw new apollo_server_lambda_1.ApolloError(error, String(code), errors);
};
function userCreate(_, args) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('huhu');
        const { email, password, first_name, last_name, company } = args;
        if (!email || !password) {
            errorResponse(400, HttpStatus.E_400);
        }
        const data = yield model_1.UserModel.createUser(email, password, first_name, last_name, company);
        return data;
    });
}
function userList(_, args) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id, email, first_name, last_name, company, is_active } = args;
        const data = yield model_1.UserModel.listUser(id, email, first_name, last_name, company, is_active);
        return data;
    });
}
function userRetrieve(_, args) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = args;
        console.log(id);
        const data = yield model_1.UserModel.retrieveUser(id);
        console.log(data);
        return data;
    });
}
function userRemove(_, args) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = args;
        const data = yield model_1.UserModel.removeUser(id);
        return data;
    });
}
function userUpdate(_, args) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id, email, password, first_name, last_name, company, is_active, } = args;
        const data = yield model_1.UserModel.updateUser(id, email, password, first_name, last_name, company, is_active);
        return data;
    });
}
exports.resolvers = {
    Query: {
        userList,
        userRetrieve,
    },
    Mutation: {
        userCreate,
        userRemove,
        userUpdate,
    },
};
//# sourceMappingURL=resolvers.js.map