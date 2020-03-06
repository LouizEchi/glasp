import { makeRemoteExecutableSchema, introspectSchema } from 'apollo-server-lambda'
import { createHttpLink } from 'apollo-link-http';
const link = createHttpLink({ uri: 'https://8pmskb88j3.execute-api.ap-southeast-1.amazonaws.com/dev/graphql' })




export const  apiGatewaySchema = async () => {
    const schema = await introspectSchema(link);
    return makeRemoteExecutableSchema({
        schema,
        link,
    })
}