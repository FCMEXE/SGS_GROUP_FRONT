import { Link } from 'react-router-dom';
import { Home, List, Navigation, Settings, User, UserCheck, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import axios, { type AxiosError } from 'axios';

interface Collaborator {
  id?: number;
  name: string;
  password: string;
  cpf: string;
  birthDate: string;
  admissionDate: string;
  status: string;
  entry?: string;
  exit?: string;
  hoursWorked?: string;
}

const initialCollaboratorState: Collaborator = {
  name: '',
  password: '',
  cpf: '',
  birthDate: '',
  admissionDate: '',
  status: 'offline',
};

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('todos');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [newCollaborator, setNewCollaborator] = useState<Collaborator>(initialCollaboratorState);
  const [collaborators, setCollaborators] = useState<Collaborator[]>([]);

  useEffect(() => {
    const fetchCollaborators = async () => {
      try {
        const response = await axios.get<Collaborator[]>('http://localhost:3000/collaborators');
        setCollaborators(response.data);
      } catch (error) {
        console.error('Erro ao buscar colaboradores:', error);
      }
    };

    fetchCollaborators();
  }, []);

  const filteredCollaborators = collaborators.filter(collaborator => {
    const matchesSearch = collaborator.name?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'todos' || collaborator.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleCreateCollaborator = () => {
    setModalOpen(true);
    setDropdownOpen(false);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setNewCollaborator(initialCollaboratorState);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewCollaborator(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/collaborators", newCollaborator);
      if (response.status === 201) {
        setCollaborators(prev => [...prev, response.data]);
        handleModalClose();
      } else {
        console.error("Erro ao adicionar colaborador:", response.statusText);
      }
    } catch (error) {
      console.error("Erro de rede:", error);
    }
  };

  const handleDeleteCollaborator = async (id?: number) => {
    if (id && window.confirm('Tem certeza que deseja excluir este colaborador?')) {
      try {
        const response = await axios.delete(`http://localhost:3000/colaboradores/${id}`);
        if (response.status === 204) { // sem conteúdo
          setCollaborators(collaborators.filter(collaborator => collaborator.id !== id));
        } else {
          console.error('Erro ao excluir colaborador:', response.statusText);
        }
      } catch (error) {
        // Aqui estamos usando type assertion para informar ao TypeScript que `error` é do tipo `AxiosError`
        const axiosError = error as AxiosError;
        console.error('Erro ao excluir colaborador:', axiosError.response ? axiosError.response.data : axiosError.message);
      }
    }
  };
  

  return (
    <div className='flex flex-col min-h-screen mb-20'>
      <header className="bg-white shadow-md p-4 flex items-center justify-between">
        <div className="flex items-center rounded-lg">
          <h1 className="text-2xl font-bold text-gray-800 mr-6">Gerenciador de Colaboradores</h1>
          <div className="flex items-center space-x-6">
            {['todos', 'ativo', 'offline', 'em rota'].map(status => (
              <div key={status} className="flex items-center space-x-2" onClick={() => setStatusFilter(status)}>
                {status === 'todos' ? <User className="text-gray-500 hover:text-gray-700 cursor-pointer" /> : null}
                {status === 'ativo' ? <UserCheck className="text-green-500 hover:text-green-700 cursor-pointer" /> : null}
                {status === 'offline' ? <X className="text-red-500 hover:text-red-700 cursor-pointer" /> : null}
                {status === 'em rota' ? <Navigation className="text-blue-500 hover:text-blue-700 cursor-pointer" /> : null}
                <span className="text-gray-700 font-medium">{status}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="relative">
          <Settings className="text-gray-500 hover:text-gray-700 cursor-pointer" onClick={toggleDropdown} />
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-10">
              <div className="p-2">
                <button onClick={handleCreateCollaborator} className="w-full text-left px-4 py-2 hover:bg-gray-100">Criar Colaborador</button>
              </div>
            </div>
          )}
        </div>
      </header>

      <div className="p-4">
        <input
          type="text"
          placeholder="Pesquisar Colaborador..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border rounded-lg"
        />
      </div>

      <div className="flex-grow bg-gray-100 flex items-center justify-center p-4">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">Nome</th>
              <th scope="col" className="px-6 py-3">Entrada</th>
              <th scope="col" className="px-6 py-3">Saída</th>
              <th scope="col" className="px-6 py-3">Horas Trabalhadas</th>
              <th scope="col" className="px-6 py-3">Status</th>
              <th scope="col" className="px-6 py-3">Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredCollaborators.map(collaborator => (
              <tr key={collaborator.id} className="bg-white border-b">
                <td className="px-6 py-4">{collaborator.name}</td>
                <td className="px-6 py-4">{collaborator.entry}</td>
                <td className="px-6 py-4">{collaborator.exit}</td>
                <td className="px-6 py-4">{collaborator.hoursWorked}</td>
                <td className="px-6 py-4">{collaborator.status}</td>
                <td className="px-6 py-4">
                  <X className="text-red-500 cursor-pointer hover:text-red-700" onClick={() => handleDeleteCollaborator(collaborator.id)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal para criar colaborador */}
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl mb-4">Criar Colaborador</h2>
            <form onSubmit={handleSubmit}>
              <input type="text" name="name" placeholder="Nome" value={newCollaborator.name} onChange={handleInputChange} className="w-full p-2 mb-2 border rounded-lg" required />
              <input type="password" name="password" placeholder="Senha" value={newCollaborator.password} onChange={handleInputChange} className="w-full p-2 mb-2 border rounded-lg" required />
              <input type="text" name="cpf" placeholder="CPF" value={newCollaborator.cpf} onChange={handleInputChange} className="w-full p-2 mb-2 border rounded-lg" required />
              <input type="date" name="birthDate" value={newCollaborator.birthDate} onChange={handleInputChange} className="w-full p-2 mb-2 border rounded-lg" required />
              <input type="date" name="admissionDate" value={newCollaborator.admissionDate} onChange={handleInputChange} className="w-full p-2 mb-2 border rounded-lg" required />
              <div className="flex justify-end space-x-2">
                <button type="button" onClick={handleModalClose} className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-lg">Cancelar</button>
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 rounded-lg">Salvar</button>
              </div>
            </form>
          </div>
        </div>
      )}

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
};

export default HomePage;
