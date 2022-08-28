interface FormProps {
  name: string;
  imgUrl: string;
  numberPokedex: number;
  types: string[];
}

export interface FormDataProps {
  formData: FormProps;
  setFormData: React.Dispatch<React.SetStateAction<FormProps>>;
}

export interface DataProps {
  sprites: {
    front_default: string;
  };

  types: [
    {
      type: {
        name: string;
      };
    },
  ];
}
