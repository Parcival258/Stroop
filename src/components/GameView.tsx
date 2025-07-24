import React, { useState, useEffect } from 'react';
import { colorOptions, type ColorOption } from '../utils/Colors';
import { useNavigate } from 'react-router-dom';

type Score = {
  name: string;
  correct: number;
  total: number;
  percentage: number;
  avgTime: number;
  timestamp: number;
};

const GameView: React.FC = () => {
  const [currentWord, setCurrentWord] = useState<ColorOption | null>(null);
  const [colorToShow, setColorToShow] = useState<ColorOption | null>(null);
  const [startTime, setStartTime] = useState<number>(0);
  const [responseTime, setResponseTimes] = useState<number[]>([]);
  const [correctCount, setCorrectCount] = useState(0);
  const [totalCount, setTotalCount] = useState(1);
  const [gameTimeLeft, setGameTimeLeft] = useState<number>(5);
  const [wordTimeoutId, setWordTimeoutId] = useState<ReturnType<typeof setTimeout> | null>(null);
  const [gameEnded, setGameEnded] = useState(false);
  const [playerName, setPlayerName] = useState('');
  const [scoreSaved, setScoreSaved] = useState(false);
  const Navigate = useNavigate();

  const saveScoreToLocalStorage = () => {
    if (!playerName.trim()) {
      return alert(`ingrese sun nombre`)
    }

    const score: Score = {
      name: playerName,
      correct: correctCount,
      total: totalCount,
      percentage: parseFloat(percentage),
      avgTime: parseFloat(avgTime),
      timestamp: Date.now(),
    }

    const stored = localStorage.getItem(`stroop_scores`)
    const prevScores: Score[] = stored ? JSON.parse(stored) : [];

    const update = [...prevScores, score]
      .sort((a, b) => b.percentage - a.percentage || a.avgTime - b.avgTime)
      .slice(0, 5);

    localStorage.setItem(`stroop_score`, JSON.stringify(update));
    setScoreSaved(true)
  }
  const nextWord = () => {
    if (gameTimeLeft <= 0 || gameEnded) return;

    const randomWord = colorOptions[Math.floor(Math.random() * colorOptions.length)];
    const randomColor = colorOptions[Math.floor(Math.random() * colorOptions.length)];

    setCurrentWord(randomWord);
    setColorToShow(randomColor);
    setStartTime(Date.now());

    const timeout = setTimeout(() => {
      if (!gameEnded) handleAnswer(null, true);
    }, 3000);

    setWordTimeoutId(timeout);
  };

  const handleAnswer = (answer: ColorOption | null, isTimeout = false) => {
    if (wordTimeoutId) {
      clearTimeout(wordTimeoutId);
      setWordTimeoutId(null);
    }

    const isCorrect = currentWord?.name === colorToShow?.name;
    const wasUserCorrect = isTimeout ? false : answer === null ? !isCorrect : isCorrect;

    setTotalCount(prev => prev + 1);

    if (wasUserCorrect) {
      setCorrectCount(prev => prev + 1);
      if (!isTimeout) {
        setResponseTimes(prev => [...prev, Date.now() - startTime]);
      }
    }

    gameTimeLeft > 0 ? nextWord() : endGame();
  };

  const endGame = () => {
    if (wordTimeoutId) clearTimeout(wordTimeoutId);
    setGameEnded(true);



  };

  // Temporizador
  useEffect(() => {
    if (gameEnded) return;

    const interval = setInterval(() => {
      setGameTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          endGame();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [gameEnded]);

  useEffect(() => {
    nextWord();
  }, []);

  // Estadísticas
  const percentage = totalCount > 0 ? ((correctCount / totalCount) * 100).toFixed(1) : '0';
  const avgTime = responseTime.length > 0
    ? (responseTime.reduce((a, b) => a + b, 0) / responseTime.length).toFixed(0)
    : '0';

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-teal-50 via-blue-50 to-indigo-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-lg space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
            Juego Stroop
          </h1>
          <p className="text-gray-600 text-sm mt-1">¿El color coincide con la palabra?</p>
        </div>

        {!gameEnded ? (
          
          <div className="bg-white rounded-3xl shadow-lg p-8 space-y-6 border border-gray-200">

            <div className="flex justify-center">
              <div className="bg-gradient-to-r from-orange-400 to-red-500 text-white px-5 py-2 rounded-full font-medium text-sm shadow">
                ⏰ {gameTimeLeft}s
              </div>
            </div>

            {/* Palabra */}
            <div className="text-center">
              <div className="bg-gray-50 rounded-2xl p-8 border-2 border-dashed border-gray-200">
                <span
                  className="text-6xl font-bold tracking-wide"
                  style={{ color: colorToShow?.cssValue }}
                >
                  {currentWord?.name}
                </span>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => handleAnswer(currentWord)}
                className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-xl font-semibold shadow transition-transform hover:scale-105"
              >
                ✓ Correcto
              </button>
              <button
                onClick={() => handleAnswer(null)}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-semibold shadow transition-transform hover:scale-105"
              >
                ✗ Incorrecto
              </button>
            </div>

            <div className="bg-teal-50 rounded-xl p-4 border border-teal-100 space-y-2">
              <div className="grid grid-cols-2 text-center gap-4">
                <div>
                  <p className="text-xs text-teal-700 uppercase font-medium">Correctas</p>
                  <p className="text-2xl font-bold text-teal-900">{correctCount}/{totalCount}</p>
                </div>
                <div>
                  <p className="text-xs text-teal-700 uppercase font-medium">Acierto</p>
                  <p className="text-2xl font-bold text-teal-900">{percentage}%</p>
                </div>
              </div>
              <div className="text-center mt-3">
                <p className="text-xs text-teal-700 uppercase font-medium">Tiempo promedio</p>
                <p className="text-lg font-bold text-teal-900">{avgTime} ms</p>
              </div>
            </div>
          </div>
        ) : (

          <div className="bg-white rounded-3xl shadow-lg p-10 space-y-6 border border-gray-200">
            {/* Resultado final */}
            <div className="text-center space-y-2">
              <div className="text-6xl">🎉</div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
                ¡Juego Terminado!
              </h2>
              <p className="text-gray-600">¡Excelente trabajo!</p>
            </div>


            <div className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-2xl p-6 border border-teal-100 space-y-3">
              <div className="flex justify-between font-medium text-teal-800">
                <span>✔️ Correctas:</span>
                <span className="font-bold text-2xl">{correctCount}</span>
              </div>
              <div className="flex justify-between font-medium text-green-800">
                <span>📊 Acierto:</span>
                <span className="font-bold text-2xl">{percentage}%</span>
              </div>
              <div className="flex justify-between font-medium text-blue-800">
                <span>⏱ Tiempo reacción:</span>
                <span className="font-bold text-2xl">{avgTime} ms</span>
              </div>
            </div>

            <div className="space-y-4">
              <input
                type="text"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                placeholder="Ingresa tu nombre"
                className="w-full px-4 py-3 rounded-xl border border-teal-200 focus:ring-2 focus:ring-teal-300 bg-gray-50 placeholder-gray-500 text-gray-800 transition"
              />
              <button
                onClick={saveScoreToLocalStorage}
                disabled={scoreSaved}
                className="w-full bg-teal-500 hover:bg-teal-600 text-white py-3 rounded-xl font-bold shadow transition-transform hover:scale-105">
                💾 {scoreSaved ? `guardado` : `Guardar`}
              </button>
              <button
                onClick={() => Navigate(`/`)}
                className="w-full bg-gray-500 hover:bg-gray-600 text-white py-3 rounded-xl font-bold shadow transition-transform hover:scale-105">
                🔄 Volver al inicio
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameView;
