import axios from 'axios';

const baseURL = process.env.VERCEL ? 'https://omni-back-jvvppereira.vercel.app/' : 'https://omni-back.herokuapp.com/'; 

const api = axios.create({
  baseURL
});

export default api;
