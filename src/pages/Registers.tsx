import { useEffect, useState } from "react";
import { Home, List, Navigation, Calendar, Clock, User } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Link } from "react-router-dom";
import vigiStaic from "../statics/vigilante.jpg";

interface Schedule {
  entry: string | null;
  lunchStart: string | null;
  lunchEnd: string | null;
  exit: string | null;
  hoursWorked: string; // Ajuste conforme necessário
}

interface Colaborador {
  id: number;
  name: string;
  cpf: string;
  admissionDate: string;
  birthDate: string;
  schedules: {
    [key: string]: Schedule;
  };
}


// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
        <p className="font-medium text-gray-900">{label}</p>
        <p className="text-indigo-600 font-semibold">{`${payload[0].value}h`}</p>
      </div>
    );
  }
  return null;
};

const Registers: React.FC = () => {
  const [collaborators, setCollaborators] = useState<Colaborador[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<Colaborador | null>(null);

  // Fetch collaborators from API
  useEffect(() => {
    const fetchCollaborators = async () => {
      try {
        const response = await fetch('http://localhost:3000/collaborators'); // Substitua pela URL da sua API
        const data = await response.json();
        setCollaborators(data); // Ajuste conforme necessário se a estrutura da resposta for diferente
      } catch (error) {
        console.error("Error fetching collaborators:", error);
      }
    };

    fetchCollaborators();
  }, []);

  // Função para calcular o total de horas trabalhadas
  const calculateTotalHours = (schedule: Schedule) => {
    if (!schedule.entry || !schedule.exit) return 0;

    const entryDate = new Date(`1970-01-01T${schedule.entry}Z`);
    const exitDate = new Date(`1970-01-01T${schedule.exit}Z`);

    let totalHours = (exitDate.getTime() - entryDate.getTime()) / 1000 / 60 / 60;

    if (schedule.lunchStart && schedule.lunchEnd) {
      const lunchStartDate = new Date(`1970-01-01T${schedule.lunchStart}Z`);
      const lunchEndDate = new Date(`1970-01-01T${schedule.lunchEnd}Z`);

      totalHours -= (lunchEndDate.getTime() - lunchStartDate.getTime()) / 1000 / 60 / 60;
    }

    return totalHours;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Header Section */}
          <div className="flex flex-col items-center space-y-4">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard de Colaboradores</h1>
            <div className="w-full max-w-md">
              <div className="relative">
                <select
                  onChange={(e) => {
                    const employee = collaborators.find(
                      (col) => col.id === Number(e.target.value)
                    );
                    setSelectedEmployee(employee || null);
                  }}
                  className="w-full bg-white rounded-lg border border-gray-300 py-3 px-4 appearance-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm text-gray-900"
                >
                  <option value="">Selecione um colaborador</option>
                  {collaborators.map((col) => (
                    <option key={col.id} value={col.id}>
                      {col.name}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>
          </div>

          {selectedEmployee && (
            <div className="space-y-6">
              {/* Employee Info Card */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center space-x-6">
                    <div className="relative">
                      <img
                        src={vigiStaic}
                        alt={selectedEmployee.name}
                        className="h-24 w-24 rounded-full object-cover ring-4 ring-indigo-50"
                      />
                      <span className="absolute bottom-0 right-0 h-4 w-4 rounded-full bg-green-400 ring-2 ring-white" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-gray-900 mb-1">{selectedEmployee.name}</h2>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center text-gray-500">
                          <User className="h-4 w-4 mr-2" />
                          <span>CPF: {selectedEmployee.cpf}</span>
                        </div>
                        <div className="flex items-center text-gray-500">
                          <Calendar className="h-4 w-4 mr-2" />
                          <span>Admissão: {selectedEmployee.admissionDate}</span>
                        </div>
                        <div className="flex items-center text-gray-500">
                          <Clock className="h-4 w-4 mr-2" />
                          <span>Nasc.: {selectedEmployee.birthDate}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Chart Section */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Horas Trabalhadas por Dia</h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={Object.entries(selectedEmployee.schedules).map(([day, schedule]) => ({
                      day,
                      totalHours: schedule.entry && schedule.exit ? calculateTotalHours(schedule) : 0,
                    }))}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="day" stroke="#6b7280" />
                      <YAxis stroke="#6b7280" />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar 
                        dataKey="totalHours" 
                        fill="#818cf8"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Schedule Table */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Horários da Semana</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dia</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Entrada</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Almoço</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Retorno</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Saída</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {Object.entries(selectedEmployee.schedules).map(([day, schedule]) => (
                        <tr key={day} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{day}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{schedule.entry || '-'}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{schedule.lunchStart || '-'}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{schedule.lunchEnd || '-'}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{schedule.exit || '-'}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {schedule.entry && schedule.exit
                              ? `${calculateTotalHours(schedule).toFixed(2)}h`
                              : '-'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

           {/* Navegação inferior */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
        <div className="max-w-md mx-auto px-4 py-3 flex justify-around">
          <Link to="/firstPage" className="p-2 rounded-full hover:bg-gray-100 transition-colors">
            <Home className="h-6 w-6 text-gray-600" />
          </Link>
          <Link to="/registers" className="p-2 rounded-full hover:bg-gray-100 transition-colors">
            <List className="h-6 w-6 text-gray-600" />
          </Link>
          <Link to="/rotas" className="p-2 rounded-full bg-indigo-100">
            <Navigation className="h-6 w-6 text-indigo-600" />
          </Link>
        </div>
      </div>
        </div>
      </div>
    </div>
  );
};

export default Registers;
