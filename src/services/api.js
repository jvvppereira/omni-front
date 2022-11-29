import axios from 'axios';

const api = axios.create({
  baseURL: process.env.OMNI_BACK || 'https://omni-back.herokuapp.com/'
});

export default api;
