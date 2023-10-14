import { useState } from "react";
import { useDashboard } from "../../DashboardContext/useDashboard";
import { useTransactions } from "../../../../../app/hooks/useTransactions";

export function useTransactionController() {
  const { areValuesVisible } = useDashboard();
  const { transactions, isLoading, isInitialLoading } = useTransactions();


  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);

  function handleOpenFiltersModal(){
    setIsFiltersModalOpen(true)
  }

  function handleCloseFiltersModal(){
    setIsFiltersModalOpen(false)
  }

  return {
    areValuesVisible,
    isInitialLoading,
    transactions,
    handleCloseFiltersModal,
    handleOpenFiltersModal,
    isFiltersModalOpen,
    isLoading
  }
}
