import axios from 'axios';

const instance = axios.create({
  url: 'http://localhost:8080',
  transformResponse: (response) => response.data,
});

export default {
  GET: instance.get,
  POST: instance.post,
};
