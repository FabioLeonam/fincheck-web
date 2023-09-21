import { Logo } from "../../components/Logo";
import { UserMenu } from "../../components/UserMenu";
import { DashboardProvider } from "./DashboardContext/DashboardContext";
import { Accounts } from "./components/Accounts/Accounts";
import { Fab } from "./components/Fab/Fab";
import { Transactions } from "./components/Transactions/Transactions";
import { NewAccountModal } from "./components/modals/NewAccountModal/NewAccountModal";
import { NewTransactionModal } from "./components/modals/NewTransactionModal/NewTransactionModal";

export function Dashboard() {

  return (
    <DashboardProvider>
      <div className="h-full w-full p-4 md:px-8 md:pb-8 md:pt-6 flex flex-col gap-4">
        <header className="h-12 flex items-center justify-between">
          <Logo  className="h-6 text-teal-900"/>
          <UserMenu />
        </header>

        <main className="flex flex-1 flex-col md:flex-row gap-4 max-h-full">
          <div className="w-full md:w-1/2 ">
            <Accounts />
          </div>
          <div className="w-full md:w-1/2 ">
            <Transactions />
          </div>
        </main>

        <Fab />
        <NewAccountModal />
        <NewTransactionModal />
      </div>
    </DashboardProvider>

  )
}
