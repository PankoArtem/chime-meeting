import AWS from 'aws-sdk'
import { v4 } from 'uuid'

const chime = new AWS.Chime({
  accessKeyId: 'AKIATVY3NUNZWKRYAKQI',
  secretAccessKey: '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',
  region: 'us-east-1',
})

chime.endpoint = new AWS.Endpoint('https://service.chime.aws.amazon.com')

const createAttendee = async (meetingId: string, clientId: string) => {
  try {
    return chime
      .createAttendee({
        MeetingId: meetingId,
        ExternalUserId: `${v4().substring(0, 8)}#${clientId}`,
      })
      .promise()
  } catch (e) {
    return e.message
  }
}

const service = async ({
  clientId,
  meetingId,
}: {
  clientId: string
  meetingId?: string
}) => {
  try {
    if (!meetingId) {
      const newMeetingId = v4()
      const meeting = await chime
        .createMeeting({
          ClientRequestToken: newMeetingId,
          MediaRegion: 'us-east-1',
          ExternalMeetingId: newMeetingId,
        })
        .promise()
      const attendee = await createAttendee(
        meeting.Meeting?.MeetingId!,
        clientId
      )
      return { meeting, attendee }
    }
    const meeting = await chime
      .getMeeting({
        MeetingId: meetingId,
      })
      .promise()
    const attendee = await createAttendee(meetingId, clientId)
    return { meeting, attendee }
  } catch (e) {
    return e.message
  }
}

export default service
