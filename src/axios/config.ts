import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://6f0wyzucq8.execute-api.us-east-1.amazonaws.com',
});

export default {
  GET: instance.get,
  POST: instance.post,
};
