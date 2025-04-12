import { axiosInstance } from '@/lib/config/axios';

export const pokemonServices = () => {
  const getList = async (offset = 0, limit = 10) => {
    const response = await axiosInstance.get('/pokemon', { params: { offset, limit } });
    return response.data;
  };

  const getDetail = async name => {
    const response = await axiosInstance.get(`/pokemon/${name}`);
    return response.data;
  };

  return { getList, getDetail };
};
