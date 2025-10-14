import axios from 'axios';

axios.defaults.withCredentials = true;

const BASE_URL = 'http://localhost:3001/auth';

export const login = async (email, password) => {
  const response = await axios.post(`${BASE_URL}/login`, { email, password });
  return response.data;
};
