import { PlusIcon } from "@radix-ui/react-icons";
import { DropdownMenu } from "../../../../components/DropdownMenu";
import { NewAccount } from "../../../../components/icons/NewAccount";
import { Income } from "../../../../components/icons/categories/income/Income";
import { CategoryIcon } from "../../../../components/icons/categories/CategoryIcon";

export function Fab(){
  return(
    <div className="fixed right-4 bottom-4">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <button className="text-white bg-teal-900 w-12 h-12 rounded-full flex items-center justify-center">
            <PlusIcon className="w-6 h-6"/>
          </button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Item className="gap-2">
            <CategoryIcon type="expense" />
            Nova despesa
          </DropdownMenu.Item>

          <DropdownMenu.Item className="gap-2">
            <CategoryIcon type="income" />
            Nova receita
          </DropdownMenu.Item>

          <DropdownMenu.Item className="gap-2">
            <NewAccount />
            Nova conta
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </div>
  )
}
