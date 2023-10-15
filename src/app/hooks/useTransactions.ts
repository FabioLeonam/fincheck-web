import { useQuery } from "@tanstack/react-query";
import { transactionService } from "../services/transactionService";
import { TransactionsFilters } from "../services/transactionService/getAll";

export function useTransactions(filters: TransactionsFilters){
  const { data, isFetching, isInitialLoading, refetch } = useQuery({
    queryKey: ['transactions'],
    queryFn: () => transactionService.getAll(filters)
  })

  return {
    transactions: data ?? [],
    isLoading: isFetching,
    isInitialLoading,
    refetchTransactions: refetch
  }
}
