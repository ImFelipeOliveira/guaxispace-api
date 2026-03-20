import axios from 'axios';

const baseUrl = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: baseUrl,
});

export const getOffers = async () => {
  const response = await api.get('/offers');
  return response.data;
};

export const createOffer = async (offer: any) => {
  const response = await api.post('/offers', offer);
  return response.data;
};
