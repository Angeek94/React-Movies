import { Modal } from "antd";
import { useModal } from "../../pages/profile/utils/useModal";
import { IModalChangePassword } from "../../interfaces/IModalChangePassword";
import { FormChangePassword } from "../FormChangePassword/FormChangePassword";
import { useCallback } from "react";

export const ModalChangePassword: React.FC<IModalChangePassword> = ({
  isModalOpen,
  setIsModalOpen,
}) => {
  const { handleCancel, handleOk } = useModal();
  const handleModalOnCancel = useCallback(
    () => handleCancel(setIsModalOpen),
    [handleCancel, setIsModalOpen]
  );
  const handleModalOnOK = useCallback(
    () => handleOk(setIsModalOpen),
    [handleOk, setIsModalOpen]
  );
  return (
    <>
      <Modal
        title="Cambio password"
        open={isModalOpen}
        footer={null}
        onCancel={handleModalOnCancel}
        destroyOnClose
      >
        <FormChangePassword
          handleOnCancel={handleModalOnCancel}
          handleOnOk={handleModalOnOK}
        />
      </Modal>
    </>
  );
};
