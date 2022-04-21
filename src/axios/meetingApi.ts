import axiosConfig from './config';

const { POST } = axiosConfig;

export default {
  joinMeeting: (clientId: string) => POST(`join?clientId=${clientId}`),
};
