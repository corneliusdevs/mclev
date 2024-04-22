import axios from 'axios';

const apiRoute = axios.create({
  baseURL: '/api/trpc',
  withCredentials: true
});

export default apiRoute;