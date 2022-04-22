import service from '../../services/chime.cervice'
import {
  APIGatewayProxyResultV2,
  Context,
  APIGatewayProxyCallbackV2,
} from 'aws-lambda'

type ChimeEvent = {
  queryStringParameters: {
    clientId?: string
    meetingId?: string
  }
}

const getParameters = (event: ChimeEvent) => {
  const meetingId = event?.queryStringParameters?.meetingId
  const clientId = event?.queryStringParameters.clientId
  if (!clientId) {
    return new Error(`missing parameter: clientId`)
  }

  return { meetingId, clientId }
}

export const handler = async (
  event: ChimeEvent,
  _context: Context,
  callback: APIGatewayProxyCallbackV2
): Promise<void> => {
  try {
    const parameters = getParameters(event)
    if (parameters instanceof Error) {
      const errorResult: APIGatewayProxyResultV2 = {
        statusCode: 400,
        body: JSON.stringify({ message: parameters.message }),
      }
      callback(null, errorResult)
      return
    }

    const chimeResult = await service(parameters)

    const result: APIGatewayProxyResultV2 = {
      statusCode: 200,
      body: JSON.stringify({
        Info: {
          meeting: chimeResult.meeting,
          attendee: chimeResult.attendee,
        },
      }),
    }
    callback(null, result)
  } catch (e) {
    callback(null, {
      statusCode: 500,
      body: JSON.stringify({ message: e.message }),
    })
  }
}
