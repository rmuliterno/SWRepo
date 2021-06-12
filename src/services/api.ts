import axios from 'axios';

// There were times where my requests would take 8 seconds or more so I increased the timeout value
const api = axios.create({
  baseURL: 'https://swapi.dev/api',
  timeout: 10000,
});

export default api;
