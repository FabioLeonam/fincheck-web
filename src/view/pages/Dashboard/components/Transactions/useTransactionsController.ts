import { useState } from "react";
import { useDashboard } from "../../DashboardContext/useDashboard";

export function useTransactionController() {
  const { areValuesVisible } = useDashboard();

  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(true);

  function handleOpenFiltersModal(){
    setIsFiltersModalOpen(true)
  }

  function handleCloseFiltersModal(){
    setIsFiltersModalOpen(false)
  }

  return {
    areValuesVisible,
    isInitialLoading: false,
    isLoading: false,
    transactions: [],
    handleCloseFiltersModal,
    handleOpenFiltersModal,
    isFiltersModalOpen
  }
}
