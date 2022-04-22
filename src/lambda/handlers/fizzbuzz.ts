import { range } from '../../utils/range'
import {
  APIGatewayProxyResultV2,
  Context,
  APIGatewayProxyCallbackV2,
} from 'aws-lambda'
import { v4 } from 'uuid'

type ChimeEvent = {
  queryStringParameters: {
    clientId?: string
    meetingId?: string
  }
}

const getParameters = (event: ChimeEvent) => {
  const meetingId = event?.queryStringParameters?.meetingId || v4()
  const clientId = event?.queryStringParameters.clientId
  if (!clientId) {
    return new Error(`missing parameter: clientId`)
  }

  return { meetingId, clientId }
}

const fizzBuzz = (upperLimit: number): string[] =>
  range(1, upperLimit).map((value) => {
    if (value % 15 === 0) {
      return 'fizzbuzz'
    } else if (value % 5 === 0) {
      return 'buzz'
    } else if (value % 3 === 0) {
      return 'fizz'
    } else {
      return `${value}`
    }
  })

export const handler = (
  event: ChimeEvent,
  _context: Context,
  callback: APIGatewayProxyCallbackV2
): void => {
  const parameters = getParameters(event)
  if (parameters instanceof Error) {
    const errorResult: APIGatewayProxyResultV2 = {
      statusCode: 400,
      body: JSON.stringify({ message: parameters.message }),
    }
    callback(null, errorResult)
    return
  }

  const answer = fizzBuzz(parameters.upperLimit)

  const result: APIGatewayProxyResultV2 = {
    statusCode: 200,
    body: JSON.stringify({
      answer,
    }),
  }
  callback(null, result)
}
