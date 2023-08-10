import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { Modal } from "../../../../components/Modal";
import { Button } from "../../../../components/Button";

interface FiltersModalProps {
  open: boolean;
  onClose(): void;
}
export function FiltersModal({ open, onClose }: FiltersModalProps){
  return(
    <Modal open={open} title="Filtros" onClose={onClose}>
      <div>
        <span className='text-lg font-bold tracking-[-1px] text-gray-800'>
          Conta
        </span>

        <div className="space-y-2 mt-2">
          <button className="p-2 rounded-2xl !bg-gray-200 w-full text-left text-gray-800 hover:bg-gray-50 transition-colors outline-none">
            Nubank
          </button>
        </div>

        <div className="space-y-2 mt-2">
          <button className="p-2 rounded-2xl w-full text-left text-gray-800 hover:bg-gray-50 transition-colors outline-none">
            XP Invest
          </button>
        </div>

        <div className="space-y-2 mt-2">
          <button className="p-2 rounded-2xl w-full text-left text-gray-800 hover:bg-gray-50 transition-colors outline-none">
            Dinheiro
          </button>
        </div>
      </div>

      <div className="mt-10 text-gray-800">
        <span className='text-lg font-bold tracking-[-1px]'>
          Ano
        </span>

        <div className="mt-2 w-52 flex items-center justify-between">
          <button className="w-12 h-12 flex items-center justify-center">
              <ChevronLeftIcon className="w-6 h-6"/>
          </button>

         <div className="flex-1 text-center">
          <span className="tracking-[-0.5px] text-sm font-medium">2023</span>
         </div>

          <button className="w-12 h-12 flex items-center justify-center">
            <ChevronRightIcon className="w-6 h-6"/>
          </button>
        </div>
      </div>

      <Button className="w-full mt-10">
        Aplicar Filtros
      </Button>
    </Modal>
  )
}
