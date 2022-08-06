import API from '.';
import { AnimeWatchingCreateProps } from '../utils/GenericTypes';

export const removeFromWatching = async (data: { id: string }) => {
  const response = await API.delete(`/watching?records[]=${data.id}`);

  return response.data;
};

export const removeFromWatch = async (data: { id: string }) => {
  const response = await API.delete(`/towatch?records[]=${data.id}`);

  return response.data;
};
