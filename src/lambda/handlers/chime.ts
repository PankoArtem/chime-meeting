import {
  APIGatewayProxyResultV2,
  Context,
  APIGatewayProxyCallbackV2,
} from 'aws-lambda'
import AWS from 'aws-sdk'
import { v4 } from 'uuid'

type ChimeEvent = {
  queryStringParameters: {
    clientId?: string
    meetingId?: string
  }
}

const chime = new AWS.Chime({
  accessKeyId: 'AKIATVY3NUNZWKRYAKQI',
  secretAccessKey: '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',
  region: 'us-east-1',
})

chime.endpoint = new AWS.Endpoint('https://service.chime.aws.amazon.com')

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

    let meeting

    if (!parameters.meetingId) {
      const meetingId = v4()
      meeting = await chime
        .createMeeting({
          ClientRequestToken: meetingId,
          MediaRegion: 'us-east-1',
          ExternalMeetingId: meetingId,
        })
        .promise()
    } else {
      meeting = await chime
        .getMeeting({
          MeetingId: parameters.meetingId,
        })
        .promise()
    }

    const attendee = await chime
      .createAttendee({
        MeetingId: meeting.Meeting!.MeetingId!,
        ExternalUserId: `${v4().substring(0, 8)}#${parameters.clientId}`,
      })
      .promise()

    const result: APIGatewayProxyResultV2 = {
      statusCode: 200,
      body: JSON.stringify({
        Info: {
          Meeting: meeting,
          Attendee: attendee,
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
