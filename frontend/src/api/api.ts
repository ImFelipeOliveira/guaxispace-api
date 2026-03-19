import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api/v1',
});

export const getOffers = async () => {
  const response = await api.get('/offers');
  return response.data;
};

export const createOffer = async (offer: any) => {
  const response = await api.post('/offers', offer);
  return response.data;
};
