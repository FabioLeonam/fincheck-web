import { Controller } from "react-hook-form";
import { Button } from "../../../../../components/Button";
import { ColorsDropdownInput } from "../../../../../components/ColorsDropdownInput";
import { Input } from "../../../../../components/Input";
import { InputCurrency } from "../../../../../components/InputCurrency";
import { Modal } from "../../../../../components/Modal";
import { Select } from "../../../../../components/Select";
import { useEditAccountModalController } from "./useEditAccountModalController";
import { TrashIcon } from "../../../../../components/icons/TrashIcon";
import { ConfirmDeleteModal } from "../../../../../components/ConfirmDeleteModal";

export function EditAccountModal(){

  const {
    isEditAccountModalOpen,
    closeEditAccountModal,
    register,
    errors,
    handleSubmit,
    control,
    isLoading,
    isDeleteModalOpen,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    handleDeleteAccount,
    isLoadingDelete,
  } = useEditAccountModalController();

  if(isDeleteModalOpen){
    return (
      <ConfirmDeleteModal
        onClose={handleCloseDeleteModal}
        title="Tem certeza que deseja excluir esta despesa?"
        description="Ao excluir a conta, também serão excluídos todos os registros de receita e despesas relacionados."
        onConfirm={handleDeleteAccount}
        isLoading={isLoadingDelete}
      />
    )
  }
  return(
    <Modal
      title="Editar conta"
      open={isEditAccountModalOpen}
      onClose={closeEditAccountModal}
      rightAction={(
        <button
          onClick={handleOpenDeleteModal}
        >
          <TrashIcon className="w-6 h-6 text-red-900"/>
        </button>
      )}
    >
      <form onSubmit={handleSubmit}>
        <div>
          <span className="text-gray-600 text-xs tracking-[-0.5px]">Saldo</span>
          <div className="flex items-center gap-2">
            <span className="text-gray-600 text-lg tracking-[-0.5px]">R$</span>

            <Controller
              name="initialBalance"
              control={control}
              defaultValue={0}
              render={({ field: { onChange, value } }) => {
                return(
                  <InputCurrency
                    error={errors.initialBalance?.message}
                    onChange={onChange}
                    value={value}
                  />
                )
              }}
            />
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4">
          <Input
            type="text"
            placeholder="Nome da conta"
            error={errors.name?.message}
            {...register('name')}
          />
          <Controller
            control={control}
            name="type"
            defaultValue="CHECKING"
            render={({ field: { onChange, value } }) => (
              <Select
                placeholder="Tipo"
                onChange={onChange}
                value={value}
                error={errors.type?.message}
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
            )}

          />
          <Controller
            name="color"
            defaultValue=""
            control={control}
            render={({ field: { onChange, value }}) => (
              <ColorsDropdownInput
                error={errors.color?.message}
                onChange={onChange}
                value={value}
            />
            )}
          />
        </div>

        <Button type="submit" className="w-full mt-6" isLoading={isLoading}>
          Salvar
        </Button>
      </form>
    </Modal>
  )
}
