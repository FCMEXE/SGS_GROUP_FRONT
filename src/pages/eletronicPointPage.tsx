import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importe useNavigate para redirecionar
import Modal from "./Modal"; // Importe o componente Modal

const ElectronicPointPage: React.FC = () => {
  const navigate = useNavigate(); // Inicializa o hook useNavigate
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [collaboratorName, setCollaboratorName] = useState<string>("Nome do Colaborador");
  const [entryTime, setEntryTime] = useState<string | null>(null);
  const [lunchTime, setLunchTime] = useState<string | null>(null);
  const [exitTime, setExitTime] = useState<string | null>(null);
  const [isEntryRecorded, setIsEntryRecorded] = useState<boolean>(false);
  const [isLunchRecorded, setIsLunchRecorded] = useState<boolean>(false);
  const [isExitRecorded, setIsExitRecorded] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [actionToConfirm, setActionToConfirm] = useState<"entry" | "lunch" | "exit" | null>(null);

  const openModal = (action: "entry" | "lunch" | "exit") => {
    setActionToConfirm(action);
    setIsModalOpen(true);
  };

  const recordTime = () => {
    const currentTime = new Date().toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    if (actionToConfirm === "entry") {
      setEntryTime(currentTime);
      setIsEntryRecorded(true);
    } else if (actionToConfirm === "lunch") {
      setLunchTime(currentTime);
      setIsLunchRecorded(true);
    } else if (actionToConfirm === "exit") {
      setExitTime(currentTime);
      setIsExitRecorded(true);
    }
    setIsModalOpen(false);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleLogout = () => {
    // Aqui você deve adicionar a lógica para remover o token de autenticação ou limpar a sessão.
    console.log("Logout realizado"); // Substitua esta linha pela lógica de logout real.
  };

  const handleBackToLogin = () => {
    navigate("/"); // Redireciona para a página de login
  };

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center px-4 font-sans">
      <div className="absolute top-4 left-4">
        <button
          onClick={handleBackToLogin}
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
        >
          Voltar para Login
        </button>
      </div>
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-8 border border-blue-100">
        <h1 className="text-2xl font-bold text-center text-blue-600 mb-4">Registro de Ponto</h1>
        <h2 className="text-xl text-center text-gray-700 mb-6">{collaboratorName}</h2>

        <div className="space-y-6">
          {/* Registro de Entrada */}
          <div className="text-center border rounded-lg p-4 shadow-sm">
            <p className="text-gray-500 mb-1">Horário de Entrada</p>
            <p className="text-xl font-semibold text-blue-600">{entryTime || "Não registrado"}</p>
            <button
              onClick={() => openModal("entry")}
              disabled={isEntryRecorded}
              className={`mt-4 w-full ${
                isEntryRecorded ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500"
              } text-white py-2 rounded-lg font-medium hover:bg-blue-600 transition`}
            >
              Registrar Entrada
            </button>
          </div>

          {/* Registro de Almoço */}
          <div className="text-center border rounded-lg p-4 shadow-sm">
            <p className="text-gray-500 mb-1">Horário de Almoço</p>
            <p className="text-xl font-semibold text-blue-600">{lunchTime || "Não registrado"}</p>
            <button
              onClick={() => openModal("lunch")}
              disabled={!isEntryRecorded || isLunchRecorded}
              className={`mt-4 w-full ${
                !isEntryRecorded || isLunchRecorded ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500"
              } text-white py-2 rounded-lg font-medium hover:bg-blue-600 transition`}
            >
              Registrar Almoço
            </button>
          </div>

          {/* Registro de Saída */}
          <div className="text-center border rounded-lg p-4 shadow-sm">
            <p className="text-gray-500 mb-1">Horário de Saída</p>
            <p className="text-xl font-semibold text-blue-600">{exitTime || "Não registrado"}</p>
            <button
              onClick={() => openModal("exit")}
              disabled={!isEntryRecorded || isExitRecorded}
              className={`mt-4 w-full ${
                !isEntryRecorded || isExitRecorded ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500"
              } text-white py-2 rounded-lg font-medium hover:bg-blue-600 transition`}
            >
              Registrar Saída
            </button>
          </div>
        </div>

      
      </div>

      {/* Modal de Confirmação */}
      {isModalOpen && (
        <Modal
          message={`Você deseja confirmar o registro de ${actionToConfirm === "entry" ? "entrada" : actionToConfirm === "lunch" ? "almoço" : "saída"}?`}
          onConfirm={recordTime}
          onCancel={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default ElectronicPointPage;
