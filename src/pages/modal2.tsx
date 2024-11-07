import React from "react";

interface Modal2Props {
  action: "entry" | "exit"; // Ação que será confirmada
  onConfirm: () => void; // Função a ser chamada quando o usuário confirmar
  onClose: () => void; // Função para fechar o modal
}

const modal2: React.FC<Modal2Props> = ({ action, onConfirm, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg w-1/3 shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-center">
          {action === "entry" ? "Confirmar Registro de Entrada" : "Confirmar Registro de Saída"}
        </h2>
        <div className="text-center mb-4">
          <p className="text-gray-600">
            Você tem certeza que deseja registrar o horário de{" "}
            {action === "entry" ? "entrada" : "saída"}?
          </p>
        </div>
        <div className="flex justify-around">
          <button
            onClick={onConfirm}
            className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition"
          >
            Confirmar
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default modal2;
