import { Modal } from "../../../../../components/Modal";
import { useNewAccountModalController } from "./useNewAccountModalCotroller";

export function NewAccountModal(){

  const { isNewAccountModalOpen, closeNewAccountModal} = useNewAccountModalController()
  return(
    <Modal
      title="Nova conta"
      open={isNewAccountModalOpen}
      onClose={closeNewAccountModal}
    >
      NewAccountModal
    </Modal>
  )
}
