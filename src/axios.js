/* eslint-disable */

import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://strapi.cleverland.by',
});

instance.interceptors.request.use((req) => {
  if (localStorage.getItem('token')) {
    req.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    return req;
  } else {
    req.headers.Authorization = 'application/json, text/plain, */*';
    return req;
  }
});

export default instance;
