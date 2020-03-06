import { APIGatewayEvent, Context, Handler, Callback } from 'aws-lambda'

export const graphqlHandler: Handler = (
  event: APIGatewayEvent,
  context: Context,
  cb: Callback,
) => {
  const response = {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*', // Required for CORS support to work
    },
    body: JSON.stringify({
      message: 'Go Serverless v1.0! Your function executed successfully!',
      input: event,
    }),
  }

  cb(null, response)
}
