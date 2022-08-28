import { AxiosError } from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiBackEnd } from '../../api/api';
import { usePokemons } from '../../hooks/usePokemons';
import './styles.scss';

export const HomePage = () => {
  const { pokemons } = usePokemons();
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');

  const filteredPokemons = searchValue
    ? pokemons.filter((pokemon) => {
        return pokemon.name.toLowerCase().includes(searchValue.toLowerCase());
      })
    : pokemons;

  const removePokemon = async (id: string) => {
    try {
      const value = window.confirm('Deseja remove esse pokémon ? ');
      if (value) {
        await apiBackEnd.delete(`api/pokemons/${id}`);
        alert('Pokémon removido com sucesso!');
        location.href = '/';
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        alert(`Ocorreu um erro: ${error.message}`);
      }
    }
  };

  const editPokemon = async (id: string) => {
    navigate(`/update-pokemon/${id}`);
  };

  return (
    <main className="homepage-container">
      <div className="header-actions">
        <div className="search-bar">
          <input
            value={searchValue}
            type="text"
            placeholder="Buscar por nome"
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
        <div className="button-action">
          <button>
            <a href="add-pokemon">adicionar</a>
          </button>
        </div>
      </div>
      <div className="card-items">
        {filteredPokemons.map((item) => (
          <div className="card" key={item.numberPokedex}>
            <div className="options-card">
              <button onClick={() => editPokemon(item.name)}>
                <img src="edit.svg" alt="edit.svg" />
              </button>
              <button onClick={() => removePokemon(item.name)}>
                <img src="delete.svg" alt="delete.svg" />
              </button>
            </div>
            <img src={item.imgUrl} alt={item.name} />
            <div className="pokemon-data">
              <p>Nº {item.numberPokedex}</p>
              <h6>{item.name}</h6>
            </div>
            <div className="btn-section">
              {item.types.map((type) => (
                <button key={type} className={`btn ${type}`}>
                  {type}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};
