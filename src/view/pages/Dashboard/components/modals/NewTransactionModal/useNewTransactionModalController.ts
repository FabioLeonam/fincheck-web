import { z } from "zod"
import { useDashboard } from "../../../DashboardContext/useDashboard"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useBankAccounts } from "../../../../../../app/hooks/useBankAccounts";

const schema = z.object({
  value: z.string().nonempty('Informe o valor'),
  name: z.string().nonempty('Informe o nome'),
  categoryId: z.string().nonempty('Informe a categoria'),
  bankAccountId: z.string().nonempty('Informe a conta'),
  date: z.date(),
})

type FormData = z.infer<typeof schema>;

export function useNewTransactionModalController() {

  const { isNewTransactionModalOpen, closeNewTransactionModal, newTransactionType } = useDashboard()

  const { accounts } = useBankAccounts()

  const {
    handleSubmit: hookFormSubmit,
    register,
    formState: { errors },
    control,
  } = useForm<FormData>({
    resolver: zodResolver(schema)
  });

  const handleSubmit = hookFormSubmit((data) => {
    console.log({data})
  })
  return {
    isNewTransactionModalOpen,
    closeNewTransactionModal,
    newTransactionType,
    register,
    control,
    errors,
    handleSubmit,
    accounts
  }
}
