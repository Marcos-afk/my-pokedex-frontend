import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { apiBackEnd } from '../../api/api';
import { StepOne } from '../../components/Form/stepOne';
import { StepTwo } from '../../components/Form/stepTwo';
import '../Create/styles.scss';

export const UpdatePage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [page, setPage] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    imgUrl: '',
    numberPokedex: 0,
    types: [''],
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const { data } = await apiBackEnd.get(`api/pokemons/${id}`);
        if (Object.keys(data).length === 0) {
          alert('Pokémon não encontrado!');
        } else {
          setFormData(data.pokemon);
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          alert(`Ocorreu um erro: ${error.response?.data}`);
        }
      }
    };
    loadData();
  }, []);

  const formDisplay = () => {
    if (page === 0) {
      return <StepOne formData={formData} setFormData={setFormData} />;
    } else {
      return <StepTwo formData={formData} setFormData={setFormData} />;
    }
  };

  const updatePokemon = async () => {
    try {
      await apiBackEnd.put(`api/pokemons/${id}`, {
        name: formData.name,
        numberPokedex: formData.numberPokedex,
      });

      alert('Pokémon atualizado com sucesso');
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
          <button onClick={() => setPage(page + 1)}>Próxima etapa</button>
        </div>
      )}
      {page === 1 && (
        <div>
          <button onClick={() => setPage(page - 1)}>Voltar</button>
          <button onClick={updatePokemon}>Editar</button>
        </div>
      )}
    </main>
  );
};
