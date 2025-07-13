import axios from 'axios';

export const createHistory = async (
  userId: string,
  data: {
    city: string;
    country: string;
    weatherDescription: string;
    weatherIcon: string;
    temperature: number;
    windSpeed: number;
    lon: number;
    lat: number;
    date: string;
  },
) => {
  const url = `https://weatheruser-production.up.railway.app/users/history/${userId}`;
  try {
    const response = await axios.post(url, data);
    return response.data;
  } catch (error) {
    console.error('Erro ao salvar histórico:', error);
    throw error;
  }
};

export const getHistory = async (userId: string) => {
  const url = `https://weatheruser-production.up.railway.app/users/history/${userId}`;
  const response = await axios.get(url);
  return response.data;
};
