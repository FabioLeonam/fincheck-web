import { Button } from "../../../../../components/Button";
import { DatePickerInput } from "../../../../../components/DatePickerInput";
import { Input } from "../../../../../components/Input";
import { InputCurrency } from "../../../../../components/InputCurrency";
import { Modal } from "../../../../../components/Modal";
import { Select } from "../../../../../components/Select";
import { useNewTransactionModalController } from "./useNewTransactionModalController";

export function NewTransactionModal(){

  const {
    isNewTransactionModalOpen,
    closeNewTransactionModal,
    newTransactionType
  } = useNewTransactionModalController()

  const isExpense = newTransactionType === 'EXPENSE'

  return(
    <Modal
      title={isExpense ? 'Nova Despesa' : 'Nova receita'}
      open={isNewTransactionModalOpen}
      onClose={closeNewTransactionModal}
    >
      <form>
        <div>
          <span className="text-gray-600 text-xs tracking-[-0.5px]">Valor {isExpense ? 'da despesa' : 'da receita'}</span>
          <div className="flex items-center gap-2">
            <span className="text-gray-600 text-lg tracking-[-0.5px]">R$</span>
            <InputCurrency />
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4">
          <Input
            type="text"
            name="name"
            placeholder={isExpense ? 'Nome da Despesa' : 'Nome da Receita'}
          />
          <Select
            placeholder="Categoria"
            options={[
            {
              value: 'CHECKING',
              label: 'Conta corrente'
            },
            {
              value: 'INVESTMENT',
              label: 'Investimentos'
            },
            {
              value: 'CASH',
              label: 'Dinheiro físico'
            }
          ]}
          />

          <Select
            placeholder={isExpense ? 'Pagar com' : 'Receber com'}
            options={[
            {
              value: 'CHECKING',
              label: 'Conta corrente'
            },
            {
              value: 'INVESTMENT',
              label: 'Investimentos'
            },
            {
              value: 'CASH',
              label: 'Dinheiro físico'
            }
          ]}
          />

          <DatePickerInput />
        </div>

        <Button type="submit" className="w-full mt-6">
          Criar
        </Button>
      </form>
    </Modal>
  )
}
