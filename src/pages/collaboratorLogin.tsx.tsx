import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye } from 'lucide-react';

const LoginPageCollaborator = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '', 
    password: ''
  });
  const [error, setError] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [collaboratorId, setCollaboratorId] = useState<string | null>(null);

  interface LoginResponse {
    message: string;
    collaborator: { 
      id: string;
    };
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password
        })
      });

      if (!response.ok) {
        throw new Error('Credenciais inválidas');
      }

      const data: LoginResponse = await response.json();
      if (data.collaborator && data.collaborator.id) {
        localStorage.setItem('collaboratorId', data.collaborator.id);
        setCollaboratorId(data.collaborator.id);
      } else {
        console.log('Erro: ID não encontrado na resposta');
        setError('ID não encontrado.');
        setModalVisible(true);
        return;
      }

      navigate('/point');

    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
        setModalVisible(true);
      } else {
        setError('Um erro desconhecido ocorreu.');
        setModalVisible(true);
      }
    }
  };

  const handleClockIn = async () => {
    if (!collaboratorId) {
      setError('ID do colaborador não encontrado.');
      setModalVisible(true);
      return;
    }

    const currentDate = new Date();
    const dayOfWeek = currentDate.toLocaleDateString('pt-BR', { weekday: 'long' });
    const time = currentDate.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

    try {
      const response = await fetch(`http://localhost:3000/collaborator/${collaboratorId}/clock-in`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          dayOfWeek,
          time
        })
      });

      if (!response.ok) {
        throw new Error('Falha ao bater o ponto.');
      }

      alert('Ponto registrado com sucesso!');
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
        setModalVisible(true);
      } else {
        setError('Um erro desconhecido ocorreu ao bater o ponto.');
        setModalVisible(true);
      }
    }
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    const storedId = localStorage.getItem('collaboratorId');
    if (storedId) {
      setCollaboratorId(storedId);
    } else {
      console.log('Nenhum colaborador ID encontrado no localStorage');
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 font-sans flex flex-col items-center justify-center shadow-shape">
      <div className="w-full max-w-sm px-4 bg-white shadow-shape rounded-xl">
        <div className='w-full max-w-sm px-4 pt-4 text-center'>
          <h2 className="text-3xl mb-1">Login</h2>
          {error && <p className="text-red-500">{error}</p>}
        </div>

        <div>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-1">
              <label className="text-sm text-gray-700">Usuário</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Digite seu nome de usuário"
                className="w-full p-2.5 rounded-md text-sm shadow-md"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm text-gray-700">Senha</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Digite sua senha"
                  className="w-full p-2.5 rounded-md text-sm pr-10 shadow-md"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/3 -translate-y-1/2 shadow-md"
                >
                  <Eye className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-cyan-400 text-white py-2.5 rounded-md text-sm font-medium mt-1.5"
            >
              Entrar
            </button>
          </form>

          <button
            onClick={handleClockIn}
            className="w-full bg-green-500 text-white py-2.5 rounded-md text-sm font-medium mt-4"
          >
            Bater Ponto
          </button>
        </div>

        {modalVisible && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold text-red-600">Erro</h3>
              <p className="mt-2 text-gray-700">{error}</p>
              <div className="mt-4 flex justify-end">
                <button
                  className="bg-cyan-400 text-white py-1 px-4 rounded-md"
                  onClick={closeModal}
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="mt-4 mb-4 text-center text-xs text-gray-500 border-t border-gray-200 pt-2">
          © 2024 SGS Group. Todos os direitos reservados.
        </div>
      </div>
    </div>
  );
};

export default LoginPageCollaborator;
