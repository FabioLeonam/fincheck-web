import { Link } from "react-router-dom";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { useRegisterController } from "./useRegisterController";

export function Register() {
  const { handleSubmit, errors, register, isLoading } = useRegisterController()

  return (
    <>
    <header className="flex flex-col gap-4 items-center">
      <h1 className="text-2xl font-bold text-gray-900 tracking-[-1px]">Crie sua conta</h1>

      <p className="space-x-2">
        <span className="text-gray-700 tracking-[-0,5px]">Já possui uma conta?</span>
        <Link className="tracking-[-0,5px] text-teal-900 font-medium" to='/login'>Fazer Login</Link>
      </p>
    </header>

    <form
      className="mt-[60px] flex flex-col gap-4"
      onSubmit={handleSubmit}
    >
      <Input
        type="text"
        placeholder="Nome"
        error={errors.name?.message}
        {...register('name')}
      />
      <Input
        type="email"
        placeholder="E-mail"
        error={errors.email?.message}
        {...register('email')}
      />
      <Input
        type="password"
        placeholder="Senha"
        error={errors.password?.message}
        {...register('password')}
      />

      <Button className="mt-2" type="submit" isLoading={isLoading}>Criar conta</Button>
    </form>
  </>
  )
}
