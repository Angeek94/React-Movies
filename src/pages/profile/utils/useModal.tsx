import { useCallback } from "react";

export const useModal = () => {
  const showModal = useCallback(
    (setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>) => {
      setIsModalOpen(true);
    },
    []
  );

  const handleOk = useCallback(
    (setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>) => {
      setIsModalOpen(false);
    },
    []
  );

  const handleCancel = useCallback(
    (setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>) => {
      setIsModalOpen(false);
    },
    []
  );

  return { showModal, handleOk, handleCancel };
};
