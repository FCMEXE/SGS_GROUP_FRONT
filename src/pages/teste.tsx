import React, { useState } from 'react';

interface Collaborator {
  id: number;
  name: string;
  rg: string;
  cpf: string;
  status: string;
}

const TimeTrackingScreen: React.FC<{ collaborator: Collaborator }> = ({ collaborator }) => {
  const [entryTime, setEntryTime] = useState('');
  const [lunchStartTime, setLunchStartTime] = useState('');
  const [lunchEndTime, setLunchEndTime] = useState('');
  const [exitTime, setExitTime] = useState('');

  const handleEntry = () => {
    const time = new Date().toLocaleTimeString();
    setEntryTime(time);
    console.log(`Entrada registrada: ${time}`);
  };

  const handleLunchStart = () => {
    const time = new Date().toLocaleTimeString();
    setLunchStartTime(time);
    console.log(`Início do almoço registrado: ${time}`);
  };

  const handleLunchEnd = () => {
    const time = new Date().toLocaleTimeString();
    setLunchEndTime(time);
    console.log(`Fim do almoço registrado: ${time}`);
  };

  const handleExit = () => {
    const time = new Date().toLocaleTimeString();
    setExitTime(time);
    console.log(`Saída registrada: ${time}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Informações do Colaborador</h2>
        <div className="mb-4">
          <p className="text-gray-700"><strong>Nome:</strong> {collaborator.name}</p>
          <p className="text-gray-700"><strong>RG:</strong> {collaborator.rg}</p>
          <p className="text-gray-700"><strong>CPF:</strong> {collaborator.cpf}</p>
          <p className="text-gray-700"><strong>Status:</strong> {collaborator.status}</p>
        </div>

        <h3 className="text-lg font-semibold mb-2">Registro de Ponto</h3>
        <div className="flex flex-col space-y-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            onClick={handleEntry}
          >
            Bater Ponto de Entrada
          </button>
          <button
            className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
            onClick={handleLunchStart}
          >
            Iniciar Almoço
          </button>
          <button
            className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
            onClick={handleLunchEnd}
          >
            Encerrar Almoço
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
            onClick={handleExit}
          >
            Bater Ponto de Saída
          </button>
        </div>

        <div className="mt-4">
          <p className="text-gray-700"><strong>Ponto de Entrada:</strong> {entryTime}</p>
          <p className="text-gray-700"><strong>Início do Almoço:</strong> {lunchStartTime}</p>
          <p className="text-gray-700"><strong>Fim do Almoço:</strong> {lunchEndTime}</p>
          <p className="text-gray-700"><strong>Ponto de Saída:</strong> {exitTime}</p>
        </div>
      </div>
    </div>
  );
};

export default TimeTrackingScreen;
