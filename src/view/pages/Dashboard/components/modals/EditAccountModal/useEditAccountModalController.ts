import { z } from "zod"
import { useDashboard } from "../../../DashboardContext/useDashboard"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { bankAccountService } from "../../../../../../app/services/bankAccountsService"
import { currencyStringToNumber } from "../../../../../../app/utils/currencyStringToNumber"
import toast from "react-hot-toast"

const schema = z.object({
  initialBalance: z.union([
    z.string().nonempty('Saldo inicial é obrigatório'),
    z.number()
  ]),
  name: z.string().nonempty('Nome da conta é obrigatório'),
  type: z.enum(['CHECKING', 'INVESTMENT', 'CASH']),
  color: z.string().nonempty('Cor é obrigatória'),
})

type FormData = z.infer<typeof schema>

export function useEditAccountModalController() {

  const { isEditAccountModalOpen, closeEditAccountModal, accountBeingEdited } = useDashboard();
  console.log({ accountBeingEdited })

  const {
    handleSubmit: hookFormSubmit,
    register,
    formState: { errors },
    control,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      color: accountBeingEdited?.color,
      initialBalance: accountBeingEdited?.currentBalance,
      name: accountBeingEdited?.name,
      type: accountBeingEdited?.type
    }
  })

  const queryClient = useQueryClient();
  const { isLoading, mutateAsync } = useMutation(bankAccountService.update);

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      await mutateAsync({
        ...data,
        initialBalance: currencyStringToNumber(data.initialBalance),
        id: accountBeingEdited!.id
      })
      toast.success('Conta editada com sucesso!');
      closeEditAccountModal();
      queryClient.invalidateQueries({ queryKey: ['bankAccounts']});
    } catch {
      toast.error('Erro ao salvar as alterações')
    }

  })

  return {
    isEditAccountModalOpen,
    closeEditAccountModal,
    register,
    errors,
    handleSubmit,
    control,
    isLoading,
    accountBeingEdited
  }
}
