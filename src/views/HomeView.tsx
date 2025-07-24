import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomeView: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-blue-50 to-blue-100 flex flex-col items-center justify-center px-6 py-8 space-y-8">
      <h1 className="text-4xl font-extrabold text-blue-800 drop-shadow-sm text-center">
        Bienvenido a Stroop Game
      </h1>

      <div className="text-center">
        <h3 className="text-lg text-gray-600 italic">
          El perfil irá aquí si queda tiempo
        </h3>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-lg w-full max-w-md text-gray-800 space-y-2">
        <h2 className="font-bold text-lg">Instrucciones:</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Presiona <strong>“Correcto”</strong> si el color coincide con la palabra.</li>
          <li>Presiona <strong>“No Correcto”</strong> si no coinciden.</li>
          <li>Tienes <strong>30 segundos</strong> para responder lo más rápido posible.</li>
        </ul>
      </div>

      <div className="flex flex-col w-full max-w-sm gap-4">
        <button
          onClick={() => navigate(`/GameView`)}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold shadow-md transition duration-200"
        >
          Iniciar juego
        </button>

        <button
          onClick={() => navigate(`/CustomGame`)}
          className="w-full bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold shadow-md transition duration-200"
        >
          Configuración personalizada
        </button>

        <button
          onClick={() => navigate(`/ScoresView`)}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-semibold shadow-md transition duration-200"
        >
          Ver puntajes
        </button>
      </div>
    </div>
  );
};

export default HomeView;
