import React from "react";

const ModalContainer = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-xl bg-white shadow-xl">
        <div className="flex items-center justify-between px-6 py-4">
          <h2 className="text-xl font-semibold">{title}</h2>

          <button
            onClick={onClose}
            className="text-2xl text-gray-500 transition hover:text-black"
          >
            &times;
          </button>
        </div>

        <div className="px-6 pb-4">{children}</div>
      </div>
    </div>
  );
};

export default ModalContainer;
