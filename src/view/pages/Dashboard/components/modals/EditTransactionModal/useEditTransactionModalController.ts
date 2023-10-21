import { z } from "zod"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useBankAccounts } from "../../../../../../app/hooks/useBankAccounts";
import { useCategories } from "../../../../../../app/hooks/useCategories";
import { useMemo } from "react";
import { Transaction } from "../../../../../../app/entities/Transaction";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { transactionService } from "../../../../../../app/services/transactionService";
import { currencyStringToNumber } from "../../../../../../app/utils/currencyStringToNumber";
import toast from "react-hot-toast";
import { useState } from "react";

const schema = z.object({
  value: z.union([
    z.string().nonempty('Informe o valor'),
    z.number()
  ]),
  name: z.string().nonempty('Informe o nome'),
  categoryId: z.string().nonempty('Informe a categoria'),
  bankAccountId: z.string().nonempty('Informe a conta'),
  date: z.date(),
})

type FormData = z.infer<typeof schema>;

export function useEditTransactionModalController(
  transaction: Transaction | null,
  onClose: () => void
) {

  const { accounts } = useBankAccounts();
  const { categories: categoriesList } = useCategories()
  const queryClient = useQueryClient();
  const {
    isLoading: isLoadingDelete,
    mutateAsync: removeTransaction
  } = useMutation(transactionService.remove)

  const categories = useMemo(() => {
    return categoriesList.filter((category) => category.type === transaction?.type)
  },[categoriesList, transaction])

  const { isLoading, mutateAsync: updateTransaction } = useMutation(transactionService.update);

  const {
    handleSubmit: hookFormSubmit,
    register,
    formState: { errors },
    control,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      bankAccountId: transaction?.bankAccountId,
      categoryId: transaction?.categoryId,
      name: transaction?.name,
      value: transaction?.value,
      date: transaction ? new Date(transaction?.date) : new Date(),
    }
  });

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const handleSubmit = hookFormSubmit(async (data) => {
    try {

      await updateTransaction({
        ...data,
        id: transaction!.id,
        value: currencyStringToNumber(data.value),
        type: transaction!.type,
        date: data.date.toISOString()
      })
      toast.success(
        transaction!.type === 'EXPENSE'
          ? 'Depesa editada com sucesso!'
          : 'Receita editada com sucesso'
      );
      onClose();
      queryClient.invalidateQueries({ queryKey: ['transactions']});
      queryClient.invalidateQueries({ queryKey: ['bankAccounts']});
    } catch {
      toast.error(
        transaction!.type === 'EXPENSE'
          ? 'Erro ao editar a despesa!'
          : 'Erro ao editar a receita!'
      )
    }
  })

  async function handleDeleteTransaction(){
    try {
      await removeTransaction(transaction!.id)
      toast.success('Transação deletada com sucesso!');
      onClose();
      queryClient.invalidateQueries({ queryKey: ['transactions']});
      queryClient.invalidateQueries({ queryKey: ['bankAccounts']});
    } catch {
      toast.error('Erro ao deletar a transação')
    }
  }


  function handleCloseDeleteModal(){
    setIsDeleteModalOpen(false);
  }

  function handleOpenDeleteModal(){
    setIsDeleteModalOpen(true);
  }

  return {
    register,
    control,
    errors,
    handleSubmit,
    accounts,
    categories,
    isLoading,
    isDeleteModalOpen,
    isLoadingDelete,
    handleDeleteTransaction,
    handleCloseDeleteModal,
    handleOpenDeleteModal
  }
}
