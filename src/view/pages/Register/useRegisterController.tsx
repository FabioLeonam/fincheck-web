import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "react-hot-toast";

import { useMutation } from '@tanstack/react-query';
import { authService } from "../../../app/services/authService/authService";
import { SignupParams } from "../../../app/services/authService/signup";

const schema = z.object({
  name: z.string().nonempty('Nome é obrigatório'),
  email: z.string().nonempty('E-mail é obrigatório').email('Informe um e-mail válido'),
  password: z.string().nonempty('A senha é obrigatório').min(8, 'A senha deve conter no mínimo 8 dígitos')
})

type FormData = z.infer<typeof schema>

export function useRegisterController() {

  const {
    handleSubmit: hookFormSubmit,
    register,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(schema)
  });

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: async (data: SignupParams) => {
      return authService.signup(data)
    },
  })
  const handleSubmit = hookFormSubmit(async (data) => {
    try{
       await mutateAsync(data)
    }catch{
      toast.error('Ocorreu um erro ao criar a sua conta')
    }
  })

  return { register, handleSubmit, errors, isLoading}
}
