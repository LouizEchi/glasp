import { ApolloServer } from 'apollo-server-lambda'
import { buildFederatedSchema } from '@apollo/federation'
import { context } from './src/context'
import { schema as typeDefs } from './src/schema'
import { resolvers } from './src/resolvers'

const server = new ApolloServer({
  schema: buildFederatedSchema([
    {
      typeDefs,
      resolvers,
    },
  ]),
  context,
  // By default, the GraphQL Playground interface and GraphQL introspection
  // is disabled in "production" (i.e. when `process.env.NODE_ENV` is `production`).
  //
  // If you'd like to have GraphQL Playground and introspection enabled in production,
  // the `playground` and `introspection` options must be set explicitly to `true`.
  playground: process.env.NODE_ENV !== 'production',
  introspection: true,
})

module.exports.handleGraphql = server.createHandler({
  cors: {
    origin: true,
    credentials: false,
  },
})
