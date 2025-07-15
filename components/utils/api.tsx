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

export const updateUser = async (
  userId: string,
  data: {
    name: string;
    password: string;
  }
) => {
  const url = `https://weatheruser-production.up.railway.app/users/${userId}`;
  try {
    const response = await axios.put(url, data);
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    throw error;
  }
};

export const loginUser = async (
  name: string,
  password: string
): Promise<{ id: number; name: string }> => {
  const url = `https://weatheruser-production.up.railway.app/users/login`;
  try {
    const response = await axios.post(url, { name, password });
    return response.data;
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    throw error;
  }
};

export const registerUser = async (
  name: string,
  password: string
): Promise<{ id: number; name: string }> => {
  const url = `https://weatheruser-production.up.railway.app/users`;
  try {
    const response = await axios.post(url, { name, password });
    return response.data;
  } catch (error) {
    console.error('Erro ao cadastrar usuário:', error);
    throw error;
  }
};