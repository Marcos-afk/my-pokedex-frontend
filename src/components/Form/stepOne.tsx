import { FormDataProps } from './FormProps';

export const StepOne = ({ formData, setFormData }: FormDataProps) => {
  return (
    <form>
      <h2>Dados do pokémon</h2>
      <input
        type="text"
        placeholder="Nome"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
      <img src={formData.imgUrl} alt={formData.name} />
    </form>
  );
};
