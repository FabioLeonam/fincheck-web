import { z } from "zod"
import { useDashboard } from "../../../DashboardContext/useDashboard"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { bankAccountService } from "../../../../../../app/services/bankAccountsService"
import { currencyStringToNumber } from "../../../../../../app/utils/currencyStringToNumber"
import toast from "react-hot-toast"
import { useState } from "react"

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

  const [isDeleteModalOpen, setIsVisibleDeleteModalOpen] = useState(false);
  const queryClient = useQueryClient();
  const {
      isLoading,
      mutateAsync: updateAccount
    } = useMutation(bankAccountService.update);

  const {
    isLoading: isLoadingDelete,
    mutateAsync: removeAccount
  } = useMutation(bankAccountService.remove)

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      await updateAccount({
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

  function handleOpenDeleteModal() {
    setIsVisibleDeleteModalOpen(true)
  }

  function handleCloseDeleteModal() {
    setIsVisibleDeleteModalOpen(false)
  }

  async function handleDeleteAccount(){
    try {
      await removeAccount(accountBeingEdited!.id)
      toast.success('Conta deletada com sucesso!');
      closeEditAccountModal();
      queryClient.invalidateQueries({ queryKey: ['bankAccounts']});
    } catch {
      toast.error('Erro ao deletar a conta')
    }

  }

  return {
    isEditAccountModalOpen,
    closeEditAccountModal,
    register,
    errors,
    handleSubmit,
    control,
    isLoading,
    accountBeingEdited,
    isDeleteModalOpen,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    handleDeleteAccount,
    isLoadingDelete
  }
}
