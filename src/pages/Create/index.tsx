import { AxiosError } from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiBackEnd, apiSprites } from '../../api/api';
import { DataProps } from '../../components/Form/FormProps';
import { StepOne } from '../../components/Form/stepOne';
import { StepTwo } from '../../components/Form/stepTwo';
import './styles.scss';

export const AddPokemonPage = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    imgUrl: '',
    numberPokedex: 0,
    types: [''],
  });

  const searchSprite = (value: string) => {
    if (!value) {
      return alert('É preciso ter um nome para fazer a busca!');
    }

    const loadData = async () => {
      try {
        const { data } = await apiSprites.get<DataProps>(value.toLowerCase());
        const typesArray = data.types.map((item) => item.type.name);
        setFormData({ ...formData, imgUrl: data.sprites.front_default, types: typesArray });
      } catch (error) {
        if (error instanceof AxiosError) {
          setFormData({ ...formData, imgUrl: '', types: [] });
          alert(`Ocorreu um erro: ${error.response?.data}`);
        }
      }
    };
    loadData();
  };

  const formDisplay = () => {
    if (page === 0) {
      return <StepOne formData={formData} setFormData={setFormData} />;
    } else {
      return <StepTwo formData={formData} setFormData={setFormData} />;
    }
  };

  const addPokemon = async () => {
    try {
      await apiBackEnd.post('api/pokemons', {
        name: formData.name,
        imgUrl: formData.imgUrl,
        numberPokedex: formData.numberPokedex,
        types: formData.types,
      });

      alert('Pokémon adicionado com sucesso');
      navigate('/');
    } catch (error) {
      if (error instanceof AxiosError) {
        alert(`Ocorreu um erro: ${error.response?.data.message}`);
      }
    }
  };
  return (
    <main className="form-container">
      {formDisplay()}
      {page === 0 && (
        <div>
          <button onClick={() => searchSprite(formData.name)}>Buscar Sprite</button>
          <button onClick={() => setPage(page + 1)}>Próxima etapa</button>
        </div>
      )}
      {page === 1 && (
        <div>
          <button onClick={() => setPage(page - 1)}>Voltar</button>
          <button onClick={addPokemon}>Adicionar</button>
        </div>
      )}
    </main>
  );
};
