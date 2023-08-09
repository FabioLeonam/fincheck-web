import { ChevronDownIcon } from "@radix-ui/react-icons";
import { TransactionsIcon } from "../../../../components/icons/TransactionsIcon";
import { DropdownMenu } from "../../../../components/DropdownMenu";
import { Income } from "../../../../components/icons/categories/income/Income";
import { Expense } from "../../../../components/icons/categories/expense/Expense";
import { Transaction } from "../../../../components/icons/Transaction";

export function TransactionTypeDropdown(){
  return(
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <button className="flex items-center gap-2">
          <TransactionsIcon />
          <span className="text-sm text-gray-800 tracking-[-0.5px] font-medium">Transações</span>
          <ChevronDownIcon className="text-gray-900"/>
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content className="w-[279px]">
        <DropdownMenu.Item className="gap-2">
          <Income />
          Receitas
        </DropdownMenu.Item >

        <DropdownMenu.Item className="gap-2">
          <Expense />
          Despesas
        </DropdownMenu.Item>

        <DropdownMenu.Item className="gap-2">
          <Transaction />
          Transações
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}
