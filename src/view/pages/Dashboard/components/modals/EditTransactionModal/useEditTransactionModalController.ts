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

  const categories = useMemo(() => {
    return categoriesList.filter((category) => category.type === transaction?.type)
  },[categoriesList, transaction])

  const { isLoading, mutateAsync } = useMutation(transactionService.update);

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

  const handleSubmit = hookFormSubmit(async (data) => {
    try {

      await mutateAsync({
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
    } catch {
      toast.error(
        transaction!.type === 'EXPENSE'
          ? 'Erro ao editar a despesa!'
          : 'Erro ao editar a receita!'
      )
    }
  })

  return {
    register,
    control,
    errors,
    handleSubmit,
    accounts,
    categories,
    isLoading
  }
}
