import API from '.';

export const removeFromWatching = async (data: { id: string }) => {
  const response = await API.delete(`/watching?records[]=${data.id}`);

  return response.data;
};

export const removeFromWatch = async (data: { id: string }) => {
  const response = await API.delete(`/towatch?records[]=${data.id}`);

  return response.data;
};
export const removeFromFinished = async (data: { id: string }) => {
  const response = await API.delete(`/finished?records[]=${data.id}`);

  return response.data;
};

export const removeFromAbandoned = async (data: { id: string }) => {
  const response = await API.delete(`/abandoned?records[]=${data.id}`);

  return response.data;
};
