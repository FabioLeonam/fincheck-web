import { useDashboard } from "../../DashboardContext/useDashboard";

export function useTransactionController() {
  const { areValuesVisible } = useDashboard();

  return {
    areValuesVisible,
    isLoading: false,
    transactions: []
  }
}
