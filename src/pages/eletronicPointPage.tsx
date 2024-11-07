import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Modal2 from "./modal2"; // Importando o componente Modal2
import axios from "axios";

const ElectronicPointPage: React.FC = () => {
  const navigate = useNavigate();
  const [collaboratorName, setCollaboratorName] = useState<string>("");
  const [entryTime, setEntryTime] = useState<string | null>(null);
  const [exitTime, setExitTime] = useState<string | null>(null); // Mantendo o estado para o horário de saída
  const [isEntryRecorded, setIsEntryRecorded] = useState<boolean>(false);
  const [isExitRecorded, setIsExitRecorded] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [actionToConfirm, setActionToConfirm] = useState<"entry" | "exit" | null>(null);
  const [selectedDay, setSelectedDay] = useState<string>("");

  const collaboratorId = localStorage.getItem("collaboratorId"); // Pega ID do colaborador

  const getCurrentDay = () => {
    const daysOfWeek = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    const currentDayIndex = new Date().getDay();
    return daysOfWeek[currentDayIndex];
  };

  useEffect(() => {
    setSelectedDay(getCurrentDay());
  }, []);

  useEffect(() => {
    if (collaboratorId) {
      const fetchCollaboratorName = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/collaborators/${collaboratorId}`);
          setCollaboratorName(response.data.name);
        } catch (error) {
          console.error("Erro ao buscar nome do colaborador:", error);
        }
      };
      fetchCollaboratorName();
    }
  }, [collaboratorId]);

  useEffect(() => {
    if (collaboratorId && selectedDay) {
      const fetchTimes = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/collaborators/${collaboratorId}/schedules?day=${selectedDay}`);
          const { entry, exit } = response.data;
          setEntryTime(entry);
          setExitTime(exit); // Armazena o horário de saída
          setIsEntryRecorded(!!entry); // Define se a entrada foi registrada
          setIsExitRecorded(!!exit); // Define se a saída foi registrada
        } catch (error) {
          console.error("Erro ao buscar horários do colaborador:", error);
        }
      };
      fetchTimes();
    }
  }, [collaboratorId, selectedDay]);

  const openModal = (action: "entry" | "exit") => {
    setActionToConfirm(action);
    setIsModalOpen(true);
  };

  const handleDayChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDay(event.target.value);
  };

  const updateCollaboratorStatus = async (status: string) => {
    try {
      await axios.patch(`http://localhost:3000/collaborators/${collaboratorId}/status`, { status });
    } catch (error) {
      console.error("Erro ao atualizar o status do colaborador:", error);
      alert("Erro ao atualizar o status do colaborador. Tente novamente.");
    }
  };

  const recordEntry = async () => {
    const currentTime = new Date().toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });

    setEntryTime(currentTime); // Atualiza o horário de entrada
    setIsEntryRecorded(true); // Marca a entrada como registrada

    await updateCollaboratorStatus("online");

    const payload = {
      day: selectedDay,
      entry: currentTime,  // Envia o horário de entrada
      exit: exitTime || null,
    };

    await recordTimeInApi(payload);
  };

  const recordExit = async () => {
    const currentTime = new Date().toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });

    setExitTime(currentTime); // Atualiza o horário de saída
    setIsExitRecorded(true); // Marca a saída como registrada
    await updateCollaboratorStatus("offline");

    const payload = {
      day: selectedDay,
      entry: entryTime,  // Usa o horário de entrada já registrado
      exit: currentTime, // Define o horário de saída
    };

    await recordTimeInApi(payload);
  };

  const recordTimeInApi = async (payload: { day: string; entry: string | null; exit: string | null }) => {
    try {
      const response = await axios.patch(`http://localhost:3000/collaborators/${collaboratorId}/schedules`, payload);
      console.log("Resposta da API:", response.data);
      setIsModalOpen(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Erro ao enviar dados para a API:", error.response?.data);
        alert(`Erro ao registrar o ponto. Detalhes: ${error.response?.data?.message || "Tente novamente."}`);
      } else {
        console.error("Erro desconhecido:", error);
      }
    }
  };

  const handleBackToLogin = () => {
    navigate("/");
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
        <h2 className="text-xl text-center text-gray-700 mb-6">{collaboratorName || "Carregando nome..."}</h2>

        <div className="text-center mb-6">
          <label htmlFor="dayOfWeek" className="text-gray-500 mb-2">Selecione o dia da semana:</label>
          <select
            id="dayOfWeek"
            value={selectedDay}
            onChange={handleDayChange}
            className="w-full p-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="monday">Segunda-feira</option>
            <option value="tuesday">Terça-feira</option>
            <option value="wednesday">Quarta-feira</option>
            <option value="thursday">Quinta-feira</option>
            <option value="friday">Sexta-feira</option>
            <option value="saturday">Sábado</option>
            <option value="sunday">Domingo</option>
          </select>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <div className="text-center border rounded-lg p-4 shadow-sm">
            <p className="text-gray-500 mb-1">Horário de Entrada</p>
            <p className="text-lg font-semibold">{entryTime || "Não registrado"}</p>
            {!isEntryRecorded && (
              <button
                onClick={recordEntry}
                disabled={isEntryRecorded}
                className="mt-2 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition"
              >
                Registrar Entrada
              </button>
            )}
          </div>

          <div className="text-center border rounded-lg p-4 shadow-sm">
            <p className="text-gray-500 mb-1">Horário de Saída</p>
            <p className="text-lg font-semibold">{exitTime || "Não registrado"}</p>
            {!isExitRecorded && isEntryRecorded && (
              <button
                onClick={recordExit}
                disabled={isExitRecorded}
                className="mt-2 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition"
              >
                Registrar Saída
              </button>
            )}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <Modal2
          action={actionToConfirm}
          onConfirm={actionToConfirm === "entry" ? recordEntry : recordExit}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default ElectronicPointPage;
