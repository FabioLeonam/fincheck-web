import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { SigninParams } from '../../../app/services/authService/signin';
import { authService } from '../../../app/services/authService/authService';

const schema = z.object({
  email: z.string().nonempty('E-mail é obrigatório').email('Informe um e-mail válido'),
  password: z.string().nonempty('A senha é obrigatório').min(8, 'A senha deve conter no mínimo 8 dígitos')
})

type FormData = z.infer<typeof schema>

export function useLoginController() {

  const {
    handleSubmit: hookFormSubmit,
    register,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(schema)
  })

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: async (data: SigninParams) => {
      return authService.signin(data)
    },
  })
  const handleSubmit = hookFormSubmit(async (data) => {
    try{
      await mutateAsync(data)
    }catch{
      toast.error('Credenciais inválidas!')
    }
  })

  console.log(errors)
  return { handleSubmit, register, errors, isLoading }
}
