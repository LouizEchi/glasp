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
const apollo_link_http_1 = require("apollo-link-http");
const link = apollo_link_http_1.createHttpLink({ uri: 'https://8pmskb88j3.execute-api.ap-southeast-1.amazonaws.com/dev/graphql' });
exports.apiGatewaySchema = () => __awaiter(void 0, void 0, void 0, function* () {
    const schema = yield apollo_server_lambda_1.introspectSchema(link);
    return apollo_server_lambda_1.makeRemoteExecutableSchema({
        schema,
        link,
    });
});
//# sourceMappingURL=schema.js.map