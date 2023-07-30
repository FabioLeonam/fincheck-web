import { Link } from "react-router-dom";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";

export function Register() {
  return (
    <>
    <header className="flex flex-col gap-4 items-center">
      <h1 className="text-2xl font-bold text-gray-900 tracking-[-1px]">Crie sua conta</h1>

      <p className="space-x-2">
        <span className="text-gray-700 tracking-[-0,5px]">Já possui uma conta?</span>
        <Link className="tracking-[-0,5px] text-teal-900 font-medium" to='/login'>Fazer Login</Link>
      </p>
    </header>

    <form className="mt-[60px] flex flex-col gap-4">
      <Input
        type="text"
        placeholder="Nome"
        name="text"
      />
      <Input
        type="email"
        placeholder="E-mail"
        name="email"
      />
      <Input
        type="password"
        placeholder="Senha"
        name="password"
      />

      <Button className="mt-2" type="submit">Criar conta</Button>
    </form>
  </>
  )
}
