import { FormDataProps } from './FormProps';

export const StepTwo = ({ formData, setFormData }: FormDataProps) => {
  return (
    <form>
      <input
        type="number"
        placeholder="Número na pokedex"
        value={formData.numberPokedex}
        onChange={(e) => setFormData({ ...formData, numberPokedex: Number(e.target.value) })}
      />
      <div className="types-container">
        {formData.types &&
          formData.types.map((type) => (
            <p key={type} className={`${type}`}>
              {type}
            </p>
          ))}
      </div>
    </form>
  );
};
