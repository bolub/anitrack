import axios from 'axios';
import API from '.';
import { AnimeWatchingProps, Fields } from '../utils/GenericTypes';

export interface updateProps {
  id: string;
  fields: Partial<Omit<Fields, 'createdTime'>>;
}

export const updateData = async (data: updateProps[]) => {
  const response = await API.patch(`/watching`, {
    records: data,
  });

  return response.data;
};
