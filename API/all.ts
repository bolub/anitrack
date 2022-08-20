import axios from 'axios';
import API from '.';

export const getAllAnime = async (searchValue: string) => {
  const response = await axios.get(
    `https://api.jikan.moe/v4/anime?q=${searchValue}`
  );

  return response.data;
};

export const getAllWatching = async () => {
  const response = await API.get(`/watching`);

  return response.data;
};

export const getAllToWatch = async () => {
  const response = await API.get(`/towatch`);

  return response.data;
};

export const getAllFinished = async () => {
  const response = await API.get(`/finished`);

  return response.data;
};

export const getAllAbandoned = async () => {
  const response = await API.get(`/abandoned`);

  return response.data;
};
