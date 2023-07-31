import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod';

const schema = z.object({
  email: z.string().nonempty('E-mail é obrigatório').email('Informe um e-mail válido'),
  password: z.string().nonempty('A senha é obrigatório').min(8, 'A senha deve conter no mínimo 8 dígitos')
})

type FormData = z.infer<typeof schema>

export function useLoginController() {

  const {
    handleSubmit: hookFormHandleSubmit,
    register,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(schema)
  })

  const handleSubmit = hookFormHandleSubmit((data) => {
    console.log('Chama a API com, ', data)
  })

  console.log(errors)
  return { handleSubmit, register, errors }
}
