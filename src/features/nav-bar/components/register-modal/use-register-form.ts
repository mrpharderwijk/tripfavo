import { useRegisterModal } from "@/features/nav-bar/components/register-modal/use-register-modal";
import axios from "axios";
import { useState } from "react";
import { Control, FieldErrors, FieldValues, useForm, UseFormHandleSubmit, UseFormReset } from "react-hook-form";

type UseRegisterFormReturnType = {
  isLoading: boolean;
  onSubmit: (data: FieldValues) => void;
  control: Control<FieldValues>;
  handleSubmit: UseFormHandleSubmit<FieldValues>;
  errors: FieldErrors<FieldValues>;
  reset: UseFormReset<FieldValues>;
  error: string | null;
};

export function useRegisterForm(): UseRegisterFormReturnType {
  const { closeDialog } = useRegisterModal();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { 
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      passwordConfirm: '',
    }
  });

  function onSubmit(data: FieldValues) {
    setIsLoading(true);
    setError(null);
    
    axios.post('/api/auth/register', data)
      .then(() => {
        closeDialog();
        reset();
      })
      .catch((error) => {
        setError(error.response?.data?.error || "Something went wrong");
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  return {
    isLoading,
    onSubmit,
    control,
    handleSubmit,
    errors,
    reset,
    error,
  }
}