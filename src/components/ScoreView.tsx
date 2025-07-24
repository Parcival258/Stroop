import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type Score = {
    name: string;
    correct: number;
    total: number;
    percentage: number;
    avgTime: number;
    timestamp: number;
};

const ScoreView: React.FC = () => {
    const [scores, setScores] = useState<Score[]>([]);
    const Navigate = useNavigate();

    useEffect(() => {
        const stored = localStorage.getItem('stroop_score');
        console.log('Stored scores:', stored);
        if (stored) {
            try {
                const parsed = JSON.parse(stored) as Score[];
                console.log('Parsed scores:', parsed);
                setScores(parsed);
            } catch (error) {
                console.error('Error al parsear los puntajes:', error);
            }
        }
    }, []);


    return (
        <div className="fixed inset-0 bg-gradient-to-br from-teal-50 via-blue-50 to-indigo-100 flex items-center justify-center px-4 py-10">
            <div className="w-full max-w-2xl bg-white rounded-3xl shadow-lg p-8 border border-gray-200 space-y-6">
                <div className="text-center">
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
                        🏆 Mejores Puntajes
                    </h2>
                    <p className="text-gray-600 mt-2">Top 5 jugadores por porcentaje de acierto</p>
                </div>

                {scores.length === 0 ? (
                    <p className="text-center text-gray-500">Aún no hay puntajes guardados.</p>
                ) : (
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b text-sm text-gray-600">
                                <th className="py-2">#</th>
                                <th className="py-2">Jugador</th>
                                <th className="py-2 text-center">✔️ Aciertos</th>
                                <th className="py-2 text-center">📊 %</th>
                                <th className="py-2 text-center">⏱ Prom. (ms)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {scores.map((score, i) => (
                                <tr
                                    key={score.timestamp}
                                    className="border-b text-sm hover:bg-teal-50 transition"
                                >
                                    <td className="py-2 text-gray-900">{i + 1}</td>
                                    <td className="py-2 text-gray-900">{score.name}</td>
                                    <td className="py-2 text-center text-gray-900">
                                        {score.correct}/{score.total}
                                    </td>
                                    <td className="py-2 text-center text-gray-900">{score.percentage.toFixed(1)}%</td>
                                    <td className="py-2 text-center text-gray-900">{Math.round(score.avgTime)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
                <div>
                    <button
                        onClick={() => Navigate(`/`)}
                        className="w-full bg-gray-500 hover:bg-gray-600 text-gray py-3 rounded-xl font-bold shadow transition-transform hover:scale-105">
                        🔄 Volver al inicio
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ScoreView;
