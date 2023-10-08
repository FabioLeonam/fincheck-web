import { z } from "zod"
import { useDashboard } from "../../../DashboardContext/useDashboard"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { bankAccountService } from "../../../../../../app/services/bankAccountsService"
import { currencyStringToNumber } from "../../../../../../app/utils/currencyStringToNumber"
import toast from "react-hot-toast"

const schema = z.object({
  initialBalance: z.string().nonempty('Saldo inicial é obrigatório'),
  name: z.string().nonempty('Nome da conta é obrigatório'),
  type: z.enum(['CHECKING', 'INVESTMENT', 'CASH']),
  color: z.string().nonempty('Cor é obrigatória'),
})

type FormData = z.infer<typeof schema>

export function useNewAccountModalController() {

  const { isNewAccountModalOpen, closeNewAccountModal } = useDashboard()

  const {
    handleSubmit: hookFormSubmit,
    register,
    formState: { errors },
    control,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const queryClient = useQueryClient();
  const { isLoading, mutateAsync} = useMutation(bankAccountService.create);

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      await mutateAsync({
        ...data,
        initialBalance: currencyStringToNumber(data.initialBalance),
      })
      toast.success('Conta cadastrada com sucesso');
      closeNewAccountModal();
      reset();
      queryClient.invalidateQueries({ queryKey: ['bankAccounts']});
    } catch {
      toast.error('Erro ao cadastrar a conta')
    }

  })

  return {
    isNewAccountModalOpen,
    closeNewAccountModal,
    register,
    errors,
    handleSubmit,
    control,
    isLoading
  }
}
