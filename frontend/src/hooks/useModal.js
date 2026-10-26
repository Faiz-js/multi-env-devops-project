import { useState } from "react";

const useModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedModal, setSelectedModal] = useState(null);

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedModal(null);
  };

  const handleSelectionModal = (selection) => {
    setIsModalOpen(true);
    setSelectedModal(selection);
  };

  return {
    isModalOpen,
    setIsModalOpen,
    selectedModal,
    setSelectedModal,
    openModal,
    closeModal,
    handleSelectionModal,
  };
};

export default useModal;
