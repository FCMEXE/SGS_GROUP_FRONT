import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye } from 'lucide-react';

const LoginPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '', // Alterado de name para username
    password: ''
  });
  const [error, setError] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  interface LoginResponse {
    access: string;
    refresh: string;
    role: string;
  }
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
  
    try {
      const response = await fetch('http://localhost:3001/login', {
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
  
      const data: LoginResponse = await response.json(); // Utilize o tipo aqui
      console.log(data); // Verifica a resposta da API
  
      // Acessa os dados retornados pela API
      const accessToken = data.access; // Acesse o access token
      const refreshToken = data.refresh; // Acesse o refresh token
      const role = data.role; // Acesse o papel do usuário
  
      console.log(accessToken); // Verifica se o token está correto
  
      // Armazena os tokens no localStorage
      localStorage.setItem('access_token', accessToken);
      localStorage.setItem('refresh_token', refreshToken);
  
      // Redireciona com base no papel do usuário
      if (role === 'admin') {
        navigate('/FirstPage'); // Corrija o nome da rota se necessário
      } else {
        navigate('/point')
      }
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
  
  
  

  const closeModal = () => {
    setModalVisible(false);
  };

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
                name="username" // Alterado para username
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

export default LoginPage;
