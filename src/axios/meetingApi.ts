import axiosConfig from './config';

const { POST } = axiosConfig;

export default {
  createMeeting: (clientId: string) => POST(`join?clientId=${clientId}`),
  joinMeeting: (clientId: string, meetingId: string) => POST(`join?clientId=${clientId}&meetingId=${meetingId}`),
};
