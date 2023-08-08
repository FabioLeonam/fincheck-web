import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { SigninParams } from '../../../app/services/authService/signin';
import { useAuth } from '../../../app/hooks/useAuth';
  import { authService } from '../../../app/services/authService';

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

  const { signIn } = useAuth()
  const handleSubmit = hookFormSubmit(async (data) => {
    try{
      const { accessToken } = await mutateAsync(data)
      signIn(accessToken);
    }catch{
      toast.error('Credenciais inválidas!')
    }
  })

  return { handleSubmit, register, errors, isLoading }
}
