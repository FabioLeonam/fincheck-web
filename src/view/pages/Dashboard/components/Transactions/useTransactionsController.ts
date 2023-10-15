import { useEffect, useState } from "react";
import { useDashboard } from "../../DashboardContext/useDashboard";
import { useTransactions } from "../../../../../app/hooks/useTransactions";
import { TransactionsFilters } from "../../../../../app/services/transactionService/getAll";

export function useTransactionController() {
  const { areValuesVisible } = useDashboard();
  const [filters, setFilters] = useState<TransactionsFilters>({
    month: new Date().getMonth(),
    year: new Date().getFullYear()
  })
  const {
    transactions,
    isLoading,
    isInitialLoading,
    refetchTransactions
  } = useTransactions(filters);

  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);

  function handleChangeFilters<TFilter extends keyof TransactionsFilters>(filter: TFilter) {
    return (value: TransactionsFilters[TFilter]) => {
      if(value === filters[filter]) return;

      setFilters((prevState) => ({
        ...prevState,
        [filter]: value
      }))
    }
  }


  function handleOpenFiltersModal(){
    setIsFiltersModalOpen(true)
  }


  function handleCloseFiltersModal(){
    setIsFiltersModalOpen(false)
  }

  useEffect(() => {
    refetchTransactions();
  }, [filters, refetchTransactions])


  return {
    areValuesVisible,
    isInitialLoading,
    transactions,
    handleCloseFiltersModal,
    handleOpenFiltersModal,
    isFiltersModalOpen,
    isLoading,
    handleChangeFilters,
    filters,
  }
}
