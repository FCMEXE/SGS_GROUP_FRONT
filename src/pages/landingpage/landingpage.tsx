import React from "react";
import { Link } from "react-router-dom"; // Importando o Link para navegação
import securityImage from "./staticLanding/ben-o-bro-wpU4veNGnHg-unsplash.jpg"; // Caminho da imagem local

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-700 font-sans">
      {/* Header */}
      <header className="py-4 border-b border-gray-200 bg-white">
        <div className="container mx-auto flex justify-between items-center px-4">
          <h1 className="text-2xl font-bold text-blue-600">SGS Security</h1>
          <nav className="space-x-4">
            <a href="#about" className="hover:text-gray-500 transition">Sobre</a>
            <a href="#services" className="hover:text-gray-500 transition">Serviços</a>
            <a href="#benefits" className="hover:text-gray-500 transition">Benefícios</a>
            <a href="#contact" className="hover:text-gray-500 transition">Contato</a>
          </nav>

          {/* Login buttons */}
          <div className="space-x-4">
            <Link to="/login/admin">
              <button className="px-6 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition">
                Login como Administrador
              </button>
            </Link>
            <Link to="/login/collaborator">
              <button className="px-6 py-2 bg-green-500 text-white font-semibold rounded hover:bg-green-600 transition">
                Login como Colaborador
              </button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section
        className="h-screen flex flex-col justify-center items-center text-center px-4 bg-cover bg-center"
        style={{ backgroundImage: `url(${securityImage})` }}
      >
        <div className="bg-white bg-opacity-70 p-8 rounded">
          <h2 className="text-4xl font-bold mb-4 text-blue-600">Controle e Segurança nas Rotas de Vigilância</h2>
          <p className="text-lg mb-6 text-gray-700">Sistema avançado de monitoramento de rotas e gestão de ponto eletrônico para segurança patrimonial.</p>
          <a href="#contact" className="px-6 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition">Fale Conosco</a>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 px-4 bg-white border-t border-gray-200">
        <div className="container mx-auto text-center">
          <h3 className="text-3xl font-semibold mb-4 text-blue-600">Sobre SGS Security</h3>
          <p className="text-gray-600 max-w-xl mx-auto">
            A SGS Security combina tecnologia de ponta com relatórios automatizados, permitindo uma supervisão precisa das rotas e horários dos colaboradores. Nossa solução oferece insights poderosos para aprimorar a segurança e a eficiência da sua operação.
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 bg-gray-50">
        <div className="container mx-auto text-center">
          <h3 className="text-3xl font-semibold mb-8 text-blue-600">Nossos Serviços</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Monitoramento de Rotas", description: "Acompanhe os colaboradores em tempo real durante suas rondas." },
              { title: "Ponto Eletrônico", description: "Registre entradas e saídas de maneira prática e segura." },
              { title: "Relatórios Automatizados", description: "Relatórios detalhados e insights de segurança em tempo real." },
            ].map((service, index) => (
              <div key={index} className="p-6 bg-white rounded border border-gray-100 shadow-sm">
                <h4 className="text-xl font-medium mb-2 text-blue-600">{service.title}</h4>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-16 px-4 bg-white border-t border-gray-200">
        <div className="container mx-auto text-center">
          <h3 className="text-3xl font-semibold mb-8 text-blue-600">Por que Escolher a SGS Security</h3>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="bg-gray-50 p-6 rounded border border-gray-100 w-80 shadow-sm">
              <h4 className="text-lg font-medium mb-2">Eficiência Operacional</h4>
              <p className="text-gray-600">Aumente a eficiência com relatórios automatizados e controle de rotas.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded border border-gray-100 w-80 shadow-sm">
              <h4 className="text-lg font-medium mb-2">Segurança Reforçada</h4>
              <p className="text-gray-600">Tenha supervisão completa das rotas e pontos de vigilância.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded border border-gray-100 w-80 shadow-sm">
              <h4 className="text-lg font-medium mb-2">Análises Avançadas</h4>
              <p className="text-gray-600">Obtenha insights detalhados para decisões estratégicas de segurança.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-gray-50 text-center">
        <div className="container mx-auto">
          <h3 className="text-3xl font-semibold mb-6 text-blue-600">Entre em Contato</h3>
          <p className="text-gray-600 max-w-lg mx-auto mb-8">Pronto para otimizar sua operação de segurança? Fale conosco para saber mais sobre nossas soluções em monitoramento e relatórios.</p>
          <a href="mailto:contato@segurancatech.com" className="bg-blue-500 text-white px-6 py-2 rounded font-semibold hover:bg-blue-600 transition">Enviar E-mail</a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-4 text-center">
        <p>&copy; 2024 SGS Security. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
