import API from '.';
import { AnimeWatchingCreateProps } from '../utils/GenericTypes';

export const addToWatching = async (data: AnimeWatchingCreateProps[]) => {
  const response = await API.post(`/watching`, {
    records: [...data],
  });

  return response.data;
};

export const addToWatch = async (data: AnimeWatchingCreateProps[]) => {
  const response = await API.post(`/towatch`, {
    records: [...data],
  });

  return response.data;
};
