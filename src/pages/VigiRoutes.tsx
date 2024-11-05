import { Home, List, Navigation } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

interface Colaborador {
  id: number;
  name: string;
  totalHours: number; // total de horas trabalhadas
}

export default function VigiRoutes() {
  const [email, setEmail] = useState("");
  const [selectedColaboradores, setSelectedColaboradores] = useState<number[]>([]);
  const [filter, setFilter] = useState("");
  const [colaboradores, setColaboradores] = useState<Colaborador[]>([]); // Estado para armazenar colaboradores
  const [loading, setLoading] = useState(true); // Estado para gerenciar o carregamento

  // Função para buscar colaboradores da API
  const fetchColaboradores = async () => {
    try {
      const response = await fetch("http://localhost:3000/collaborators"); // Substitua pela URL da sua API
      const data = await response.json();
      setColaboradores(data);
    } catch (error) {
      console.error("Erro ao buscar colaboradores:", error);
    } finally {
      setLoading(false); // Atualiza o estado de loading
    }
  };

  // Use o useEffect para buscar colaboradores quando o componente for montado
  useEffect(() => {
    fetchColaboradores();
  }, []);

  const handleSelectColaborador = (id: number) => {
    setSelectedColaboradores((prev) =>
      prev.includes(id) ? prev.filter((colId) => colId !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedColaboradores.length === colaboradores.length) {
      setSelectedColaboradores([]);
    } else {
      setSelectedColaboradores(colaboradores.map(col => col.id));
    }
  };

  const handleSendReport = () => {
    console.log("Enviar relatório para:", email);
    console.log("Colaboradores selecionados:", selectedColaboradores);
  };

  const filteredColaboradores = colaboradores.filter((colaborador) =>
    colaborador.name.toLowerCase().includes(filter.toLowerCase())
  );

  if (loading) {
    return <div className="text-center">Carregando colaboradores...</div>; // Mensagem de carregamento
  }

  return (
    <div className="h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <main className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
        <h1 className="text-3xl font-bold mb-4 text-center text-indigo-600">Enviar Extrato de Colaboradores</h1>
        <input
          type="email"
          placeholder="Digite seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-indigo-300 rounded p-3 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-150"
        />
        <input
          type="text"
          placeholder="Filtrar por nome"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border border-indigo-300 rounded p-3 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-150"
        />
        <button
          onClick={handleSelectAll}
          className="bg-indigo-500 text-white py-2 px-4 rounded mb-4 w-full transition duration-200 hover:bg-indigo-600"
        >
          {selectedColaboradores.length === colaboradores.length ? "Deselecionar Todos" : "Selecionar Todos"}
        </button>
        <h2 className="text-lg font-semibold mb-2">Selecione os Colaboradores:</h2>
        <table className="min-w-full bg-white border border-gray-300 rounded-lg mb-4 shadow-md">
          <thead>
            <tr>
              <th className="border-b p-3 text-left">Selecionar</th>
              <th className="border-b p-3 text-left">Nome</th>
              <th className="border-b p-3 text-left">Total de Horas</th>
            </tr>
          </thead>
          <tbody>
            {filteredColaboradores.map((colaborador) => (
              <tr key={colaborador.id} className="hover:bg-gray-100 transition duration-200">
                <td className="border-b p-3">
                  <input
                    type="checkbox"
                    checked={selectedColaboradores.includes(colaborador.id)}
                    onChange={() => handleSelectColaborador(colaborador.id)}
                    className="h-4 w-4"
                  />
                </td>
                <td className="border-b p-3">{colaborador.name}</td>
                <td className="border-b p-3">{colaborador.totalHours}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          onClick={handleSendReport}
          className="mt-4 bg-blue-600 text-white py-2 px-4 rounded transition duration-200 hover:bg-blue-700"
          disabled={!email || selectedColaboradores.length === 0}
        >
          Enviar Extrato
        </button>
      </main>

      {/* Navegação inferior */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
        <div className="max-w-md mx-auto px-4 py-3 flex justify-around">
          <Link to="/registers" className="p-2 rounded-full hover:bg-gray-100 transition-colors">
            <Home className="h-6 w-6 text-gray-600" />
          </Link>
          <Link to="/registers" className="p-2 rounded-full hover:bg-gray-100 transition-colors">
            <List className="h-6 w-6 text-gray-600" />
          </Link>
          <Link to="/firstPage" className="p-2 rounded-full bg-indigo-100">
            <Navigation className="h-6 w-6 text-indigo-600" />
          </Link>
        </div>
      </div>
    </div>
  );
}
