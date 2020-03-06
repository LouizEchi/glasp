import { ApolloServer, mergeSchemas } from 'apollo-server-lambda'
import { apiGatewaySchema } from './schema'
import { APIGatewayProxyResult } from 'aws-lambda';


module.exports.handleGraphql = async(env: any, context: any) => {
  const gt_schema = await apiGatewaySchema();
  const schema = mergeSchemas({
    schemas: [gt_schema],
  })
  const server = new ApolloServer({
    schema,
    // By default, the GraphQL Playground interface and GraphQL introspection
    // is disabled in "production" (i.e. when `process.env.NODE_ENV` is `production`).
    //
    // If you'd like to have GraphQL Playground and introspection enabled in production,
    // the `playground` and `introspection` options must be set explicitly to `true`.
    playground: process.env.NODE_ENV !== 'production',
    introspection: true,
  })
  
  
  return new Promise((resolve, reject) => server.createHandler({
      cors: {
        origin: true,
        credentials: false,
      },
    })(env, context, (error: Error, result: APIGatewayProxyResult) => {
      if (error) return reject(error);
      return resolve(result);
    }));
}
