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
const schema_1 = require("./schema");
module.exports.handleGraphql = (env, context) => __awaiter(void 0, void 0, void 0, function* () {
    const gt_schema = yield schema_1.apiGatewaySchema();
    const schema = apollo_server_lambda_1.mergeSchemas({
        schemas: [gt_schema],
    });
    const server = new apollo_server_lambda_1.ApolloServer({
        schema,
        // By default, the GraphQL Playground interface and GraphQL introspection
        // is disabled in "production" (i.e. when `process.env.NODE_ENV` is `production`).
        //
        // If you'd like to have GraphQL Playground and introspection enabled in production,
        // the `playground` and `introspection` options must be set explicitly to `true`.
        playground: process.env.NODE_ENV !== 'production',
        introspection: true,
    });
    return new Promise((resolve, reject) => server.createHandler({
        cors: {
            origin: true,
            credentials: false,
        },
    })(env, context, (error, result) => {
        if (error)
            return reject(error);
        return resolve(result);
    }));
});
//# sourceMappingURL=handler.js.map