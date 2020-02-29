"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_lambda_1 = require("apollo-server-lambda");
const context_1 = require("./src/context");
const schema_1 = require("./src/schema");
const resolvers_1 = require("./src/resolvers");
const server = new apollo_server_lambda_1.ApolloServer({
    typeDefs: schema_1.schema,
    resolvers: resolvers_1.resolvers,
    context: context_1.context,
    // By default, the GraphQL Playground interface and GraphQL introspection
    // is disabled in "production" (i.e. when `process.env.NODE_ENV` is `production`).
    //
    // If you'd like to have GraphQL Playground and introspection enabled in production,
    // the `playground` and `introspection` options must be set explicitly to `true`.
    playground: process.env.NODE_ENV !== 'production',
    introspection: true,
});
module.exports.handleGraphql = server.createHandler({
    cors: {
        origin: '*',
        credentials: false,
    },
});
//# sourceMappingURL=handler.js.map