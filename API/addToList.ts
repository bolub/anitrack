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

export const addToFinished = async (data: AnimeWatchingCreateProps[]) => {
  const response = await API.post(`/finished`, {
    records: [...data],
  });

  return response.data;
};

export const addToAbandoned = async (data: AnimeWatchingCreateProps[]) => {
  const response = await API.post(`/abandoned`, {
    records: [...data],
  });

  return response.data;
};
