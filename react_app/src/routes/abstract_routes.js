import axios from 'axios';

axios.defaults.withCredentials = true;

export const apiClient = axios.create({
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
});

export const getAll = async (url) => {
  const response = await apiClient.get(url);
  return response.data;
};

export const create = async (url, data) => {
  const response = await apiClient.post(url, data);
  return response.data;
};

export const update = async (url, id, data) => {
  const response = await apiClient.patch(`${url}/${id}`, data);
  return response.data;
};

export const remove = async (url, id) => {
  const response = await apiClient.delete(`${url}/${id}`);
  return response.data;
};
