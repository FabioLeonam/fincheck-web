import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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

  const handleSubmit = hookFormSubmit((data) => {
    console.log(data)
  })

  return { register, handleSubmit, errors}
}
