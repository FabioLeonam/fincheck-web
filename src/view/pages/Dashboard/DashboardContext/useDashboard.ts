import { useContext } from "react";
import { DashboardContext } from "./DashboardContext";

export function useDashboard(){
  return useContext(DashboardContext);
}
