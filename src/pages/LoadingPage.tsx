// src/components/Loading.tsx


const Loading = () => {
  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-10 rounded-lg shadow-md flex items-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500 mr-4"></div>
        <p className="text-gray-500">Carregando dados, por favor, aguarde.</p>
      </div>
    </div>
  );
};

export default Loading;