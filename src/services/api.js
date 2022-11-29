import axios from 'axios';

const baseURL = process.env.OMNI_BACK || 'https://omni-back.herokuapp.com/';

const api = axios.create({
  baseURL
});

export default api;
