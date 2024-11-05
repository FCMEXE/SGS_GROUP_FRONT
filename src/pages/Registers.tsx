import { useState } from "react";
import { Home, List, Navigation, Calendar, Clock, User, Building } from "lucide-react";
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

interface Schedule {
  day: string;
  entry: string;
  lunchStart: string;
  lunchEnd: string;
  exit: string;
  hoursWorked: string;
  totalHours: number;
}

interface Colaborador {
  id: number;
  name: string;
  rg: string;
  cpf: string;
  admissionDate: string;
  dataNasc: string;
  exitDate: string;
  weeklySchedule: Schedule[];
}

const collaborators: Colaborador[] = [
  {
    id: 1,
    name: "Artur Biamonti",
    rg: "12.345.678-9",
    cpf: "123.456.789-00",
    dataNasc: "08/04/1997",
    admissionDate: "01/01/2020",
    exitDate: "N/A",
    weeklySchedule: [
      { day: "Segunda", entry: "08:00 AM", lunchStart: "12:00 PM", lunchEnd: "01:00 PM", exit: "05:00 PM", hoursWorked: "8h", totalHours: 8 },
      { day: "Terça", entry: "08:30 AM", lunchStart: "12:30 PM", lunchEnd: "01:00 PM", exit: "05:30 PM", hoursWorked: "8h", totalHours: 8 },
      { day: "Quarta", entry: "09:00 AM", lunchStart: "01:00 PM", lunchEnd: "01:30 PM", exit: "06:00 PM", hoursWorked: "8h", totalHours: 8 },
      { day: "Quinta", entry: "08:15 AM", lunchStart: "12:00 PM", lunchEnd: "01:00 PM", exit: "05:15 PM", hoursWorked: "8h", totalHours: 8 },
      { day: "Sexta", entry: "08:00 AM", lunchStart: "12:00 PM", lunchEnd: "01:00 PM", exit: "05:00 PM", hoursWorked: "8h", totalHours: 8 },
      { day: "Sábado", entry: "09:00 AM", lunchStart: "01:00 PM", lunchEnd: "01:30 PM", exit: "03:00 PM", hoursWorked: "5h", totalHours: 5 },
      { day: "Domingo", entry: "", lunchStart: "", lunchEnd: "", exit: "", hoursWorked: "Folga", totalHours: 0 },
    ],
  },
  {
    id: 2,
    name: "Fernanda Almeida",
    rg: "23.456.789-0",
    cpf: "234.567.890-11",
    dataNasc: "15/03/1995",
    admissionDate: "15/02/2021",
    exitDate: "N/A",
    weeklySchedule: [
      { day: "Segunda", entry: "09:00 AM", lunchStart: "01:00 PM", lunchEnd: "02:00 PM", exit: "06:00 PM", hoursWorked: "8h", totalHours: 8 },
      { day: "Terça", entry: "08:30 AM", lunchStart: "12:30 PM", lunchEnd: "01:00 PM", exit: "05:30 PM", hoursWorked: "8h", totalHours: 8 },
      { day: "Quarta", entry: "09:00 AM", lunchStart: "01:00 PM", lunchEnd: "01:30 PM", exit: "06:00 PM", hoursWorked: "8h", totalHours: 8 },
      { day: "Quinta", entry: "08:00 AM", lunchStart: "12:00 PM", lunchEnd: "01:00 PM", exit: "05:00 PM", hoursWorked: "8h", totalHours: 8 },
      { day: "Sexta", entry: "09:30 AM", lunchStart: "01:00 PM", lunchEnd: "02:00 PM", exit: "06:30 PM", hoursWorked: "8h", totalHours: 8 },
      { day: "Sábado", entry: "N/A", lunchStart: "", lunchEnd: "", exit: "", hoursWorked: "Folga", totalHours: 0 },
      { day: "Domingo", entry: "N/A", lunchStart: "", lunchEnd: "", exit: "", hoursWorked: "Folga", totalHours: 0 },
    ],
  },
  {
    id: 3,
    name: "Ricardo Mendes",
    rg: "34.567.890-1",
    cpf: "345.678.901-22",
    dataNasc: "22/08/1989",
    admissionDate: "10/01/2019",
    exitDate: "N/A",
    weeklySchedule: [
      { day: "Segunda", entry: "08:15 AM", lunchStart: "12:00 PM", lunchEnd: "01:00 PM", exit: "05:15 PM", hoursWorked: "8h", totalHours: 8 },
      { day: "Terça", entry: "08:30 AM", lunchStart: "12:30 PM", lunchEnd: "01:00 PM", exit: "05:30 PM", hoursWorked: "8h", totalHours: 8 },
      { day: "Quarta", entry: "09:00 AM", lunchStart: "01:00 PM", lunchEnd: "01:30 PM", exit: "06:00 PM", hoursWorked: "8h", totalHours: 8 },
      { day: "Quinta", entry: "08:00 AM", lunchStart: "12:00 PM", lunchEnd: "01:00 PM", exit: "05:00 PM", hoursWorked: "8h", totalHours: 8 },
      { day: "Sexta", entry: "N/A", lunchStart: "", lunchEnd: "", exit: "", hoursWorked: "Folga", totalHours: 0 },
      { day: "Sábado", entry: "09:00 AM", lunchStart: "01:00 PM", lunchEnd: "01:30 PM", exit: "03:00 PM", hoursWorked: "5h", totalHours: 5 },
      { day: "Domingo", entry: "N/A", lunchStart: "", lunchEnd: "", exit: "", hoursWorked: "Folga", totalHours: 0 },
    ],
  },
  {
    id: 4,
    name: "Juliana Costa",
    rg: "45.678.901-2",
    cpf: "456.789.012-33",
    dataNasc: "30/06/1992",
    admissionDate: "20/03/2021",
    exitDate: "N/A",
    weeklySchedule: [
      { day: "Segunda", entry: "09:00 AM", lunchStart: "12:00 PM", lunchEnd: "01:00 PM", exit: "06:00 PM", hoursWorked: "8h", totalHours: 8 },
      { day: "Terça", entry: "N/A", lunchStart: "", lunchEnd: "", exit: "", hoursWorked: "Folga", totalHours: 0 },
      { day: "Quarta", entry: "08:00 AM", lunchStart: "12:00 PM", lunchEnd: "01:00 PM", exit: "05:00 PM", hoursWorked: "8h", totalHours: 8 },
      { day: "Quinta", entry: "08:30 AM", lunchStart: "12:30 PM", lunchEnd: "01:00 PM", exit: "05:30 PM", hoursWorked: "8h", totalHours: 8 },
      { day: "Sexta", entry: "09:00 AM", lunchStart: "01:00 PM", lunchEnd: "02:00 PM", exit: "06:00 PM", hoursWorked: "8h", totalHours: 8 },
      { day: "Sábado", entry: "N/A", lunchStart: "", lunchEnd: "", exit: "", hoursWorked: "Folga", totalHours: 0 },
      { day: "Domingo", entry: "N/A", lunchStart: "", lunchEnd: "", exit: "", hoursWorked: "Folga", totalHours: 0 },
    ],
  },
  {
    id: 5,
    name: "Lucas Pereira",
    rg: "56.789.012-3",
    cpf: "567.890.123-44",
    dataNasc: "05/12/1990",
    admissionDate: "10/10/2018",
    exitDate: "N/A",
    weeklySchedule: [
      { day: "Segunda", entry: "08:00 AM", lunchStart: "12:00 PM", lunchEnd: "01:00 PM", exit: "05:00 PM", hoursWorked: "8h", totalHours: 8 },
      { day: "Terça", entry: "08:30 AM", lunchStart: "12:30 PM", lunchEnd: "01:00 PM", exit: "05:30 PM", hoursWorked: "8h", totalHours: 8 },
      { day: "Quarta", entry: "09:00 AM", lunchStart: "01:00 PM", lunchEnd: "01:30 PM", exit: "06:00 PM", hoursWorked: "8h", totalHours: 8 },
      { day: "Quinta", entry: "08:15 AM", lunchStart: "12:00 PM", lunchEnd: "01:00 PM", exit: "05:15 PM", hoursWorked: "8h", totalHours: 8 },
      { day: "Sexta", entry: "08:00 AM", lunchStart: "12:00 PM", lunchEnd: "01:00 PM", exit: "05:00 PM", hoursWorked: "8h", totalHours: 8 },
      { day: "Sábado", entry: "N/A", lunchStart: "", lunchEnd: "", exit: "", hoursWorked: "Folga", totalHours: 0 },
      { day: "Domingo", entry: "N/A", lunchStart: "", lunchEnd: "", exit: "", hoursWorked: "Folga", totalHours: 0 },
    ],
  },
];

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

export default function Registers() {
  const [selectedEmployee, setSelectedEmployee] = useState<Colaborador | null>(null);

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
                        src={`/api/placeholder/120/120`}
                        alt={selectedEmployee.name}
                        className="h-24 w-24 rounded-full object-cover ring-4 ring-indigo-50"
                      />
                      <span className="absolute bottom-0 right-0 h-4 w-4 rounded-full bg-green-400 ring-2 ring-white" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-gray-900 mb-1">{selectedEmployee.name}</h2>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center text-gray-500">
                          <Building className="h-4 w-4 mr-2" />
                          <span>RG: {selectedEmployee.rg}</span>
                        </div>
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
                          <span>Nasc.: {selectedEmployee.dataNasc}</span>
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
                    <BarChart data={selectedEmployee.weeklySchedule}>
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
                      {selectedEmployee.weeklySchedule.map((schedule, index) => (
                        <tr key={index} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {schedule.day}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {schedule.entry || "-"}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {schedule.lunchStart || "-"}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {schedule.lunchEnd || "-"}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {schedule.exit || "-"}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">
                            {schedule.hoursWorked}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
        <div className="max-w-md mx-auto px-4 py-3 flex justify-around">
          <Link to="/firstPage" className="p-2 rounded-full hover:bg-gray-100 transition-colors">
            <Home className="h-6 w-6 text-gray-600" />
          </Link>
          <Link to="/registers" className="p-2 rounded-full bg-indigo-100">
            <List className="h-6 w-6 text-indigo-600" />
          </Link>
          <Link to="/rotas" className="p-2 rounded-full hover:bg-gray-100 transition-colors">
            <Navigation className="h-6 w-6 text-gray-600" />
          </Link>
        </div>
      </div>
    </div>
  );
}


