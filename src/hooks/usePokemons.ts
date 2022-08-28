import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { apiBackEnd } from '../api/api';
import { pokemonsProps } from './pokemonsProps';

export const usePokemons = () => {
  const [pokemons, setPokemons] = useState<pokemonsProps[]>([]);
  useEffect(() => {
    const loadData = async () => {
      try {
        const { data } = await apiBackEnd.get('api/pokemons');

        setPokemons(data.pokemons);
      } catch (error) {
        if (error instanceof AxiosError) {
          alert(`ocorreu um erro: ${error.response?.data}`);
        }
      }
    };

    loadData();
  }, []);

  return { pokemons };
};
