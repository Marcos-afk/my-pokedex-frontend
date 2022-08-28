import axios from 'axios';

export const apiBackEnd = axios.create({
  baseURL: process.env.REACT_APP_API_BACKEND,
});

export const apiSprites = axios.create({
  baseURL: process.env.REACT_APP_API_SPRITES,
});
