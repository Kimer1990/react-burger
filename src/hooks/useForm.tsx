import { useState, ChangeEvent } from "react";

export function useForm(inputValues: any) {
  const [form, setForm] = useState(inputValues);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setForm({ ...form, [name]: value });
  };
  return { form, handleChange, setForm };
}
