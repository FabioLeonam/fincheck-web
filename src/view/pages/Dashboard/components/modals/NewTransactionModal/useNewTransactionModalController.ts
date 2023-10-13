import { z } from "zod"
import { useDashboard } from "../../../DashboardContext/useDashboard"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useBankAccounts } from "../../../../../../app/hooks/useBankAccounts";
import { useCategories } from "../../../../../../app/hooks/useCategories";
import { useMemo } from "react";
import { transactionService } from "../../../../../../app/services/transactionService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { currencyStringToNumber } from "../../../../../../app/utils/currencyStringToNumber";

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

  const queryClient = useQueryClient();
  const { accounts } = useBankAccounts()
  const { categories: categoriesList } = useCategories()
  const {
    isLoading,
    mutateAsync,
  } = useMutation(transactionService.create)

  const categories = useMemo(() => {
    return categoriesList.filter((category) => category.type === newTransactionType)
  },[categoriesList, newTransactionType])

  const {
    handleSubmit: hookFormSubmit,
    register,
    formState: { errors },
    control,
    reset
  } = useForm<FormData>({
    resolver: zodResolver(schema)
  });

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      await mutateAsync({
        ...data,
        value: currencyStringToNumber(data.value),
        type: newTransactionType!,
        date: data.date.toISOString()
      })
      toast.success(
        newTransactionType === 'EXPENSE'
          ? 'Depesa cadastrada com sucesso!'
          : 'Receita cadastrada com sucesso'
      );
      closeNewTransactionModal();
      reset();
      queryClient.invalidateQueries({ queryKey: ['transactions']});
    } catch {
      toast.error(
        newTransactionType === 'EXPENSE'
          ? 'Erro ao cadastrar a despesa!'
          : 'Erro ao cadastrar a receita!'
      )
    }
  })
  return {
    isNewTransactionModalOpen,
    closeNewTransactionModal,
    newTransactionType,
    register,
    control,
    errors,
    handleSubmit,
    accounts,
    categories,
    isLoading
  }
}
