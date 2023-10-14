import { useQuery } from "@tanstack/react-query";
import { transactionService } from "../services/transactionService";

export function useTransactions(){
  const { data, isFetching, isInitialLoading } = useQuery({
    queryKey: ['transactions'],
    queryFn: () => transactionService.getAll({
      month: 9,
      year: 2023
    })
  })

  return {
    transactions: data ?? [],
    isLoading: isFetching,
    isInitialLoading
  }
}
