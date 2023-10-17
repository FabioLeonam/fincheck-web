import { useEffect, useState } from "react";
import { useDashboard } from "../../DashboardContext/useDashboard";
import { useTransactions } from "../../../../../app/hooks/useTransactions";
import { TransactionsFilters } from "../../../../../app/services/transactionService/getAll";
import { Transaction } from "../../../../../app/entities/Transaction";

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
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [transactionBeingEdited, setTransactionBeingEdited] = useState<null | Transaction>(null)
  function handleChangeFilters<TFilter extends keyof TransactionsFilters>(filter: TFilter) {
    return (value: TransactionsFilters[TFilter]) => {
      if(value === filters[filter]) return;

      setFilters((prevState) => ({
        ...prevState,
        [filter]: value
      }))
    }
  }

  function handleApplyFilters({bankAccountId, year}: { bankAccountId: string | undefined, year: number}){
    handleChangeFilters('bankAccountId')(bankAccountId)
    handleChangeFilters('year')(year)
    setIsFiltersModalOpen(false)
  }

  function handleOpenFiltersModal(){
    setIsFiltersModalOpen(true)
  }


  function handleCloseFiltersModal(){
    setIsFiltersModalOpen(false)
  }

  function handleOpenEditTransactionModal(transaction: Transaction){
    setIsEditModalOpen(true);
    setTransactionBeingEdited(transaction)
  }

  function handleCloseEditTransactionModal(){
    setIsEditModalOpen(false);
    setTransactionBeingEdited(null)
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
    handleApplyFilters,
    transactionBeingEdited,
    isEditModalOpen,
    handleOpenEditTransactionModal,
    handleCloseEditTransactionModal
  }
}
