import React from "react";

interface ModalProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const Modal: React.FC<ModalProps> = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm mx-auto">
        <h2 className="text-lg font-semibold mb-4">Confirmação</h2>
        <p className="mb-6">{message}</p>
        <div className="flex justify-between">
          <button
            onClick={onCancel}
            className="bg-gray-300 text-gray-800 py-2 px-4 rounded hover:bg-gray-400"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
