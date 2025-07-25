import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CustomGameConfigView: React.FC = () => {
    const [totalTime, setTotalTime] = useState(30);
    const [wordTime, setWordTime] = useState(3000);
    const navigate = useNavigate();

    const startCustomGame = () => {
        const config = {
            totalTime,
            wordTime,
            isCustom: true,
        };
        localStorage.setItem('stroop_config', JSON.stringify(config));
        navigate('/GameView');
    };

    return (
        <div className='fixed inset-0 bg-gradient-to-br from-teal-50 via-blue-50 to-indigo-100 flex items-center justify-center px-4 py-10'>
            <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow space-y-4">
                <h2 className="text-xl font-bold text-center text-blue-700">🎮 Configurar Juego Personalizado</h2>

                <label className="text-teal-900 block font-semibold">Duración total (segundos):</label>
                <input
                    type="number"
                    min={10}
                    max={300}
                    value={totalTime}
                    onChange={(e) => setTotalTime(Number(e.target.value))}
                    className="text-teal-900 w-full border rounded px-3 py-2"
                />

                <label className="text-teal-900 block font-semibold mt-4">Tiempo por palabra (ms):</label>
                <input
                    type="number"
                    min={500}
                    max={5000}
                    value={wordTime}
                    onChange={(e) => setWordTime(Number(e.target.value))}
                    className="text-teal-900 w-full border rounded px-3 py-2"
                />

                <button
                    onClick={startCustomGame}
                    className="text-teal-900 w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 rounded"
                >
                    🚀 Iniciar juego personalizado
                </button>
            </div>
        </div>
    );
};

export default CustomGameConfigView;
