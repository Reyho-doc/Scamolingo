import React, { useState, useEffect } from 'react';
import { gameScenarios, GameScenario } from '../data/gameData';

interface IsThisAScamGameProps {
  onBack: () => void;
  onWin: () => void;
}

const ScenarioDisplay: React.FC<{ scenario: GameScenario }> = ({ scenario }) => {
    const baseClasses = "p-4 rounded-lg max-w-lg mx-auto border";
    const containerClasses = {
        'SMS': "bg-green-800/20 border-green-600",
        'Email': "bg-slate-700 border-slate-600",
        'Social Media': "bg-blue-800/20 border-blue-600",
        'Pop-up': "bg-red-800/20 border-red-500",
    };

    return (
        <div className={`${baseClasses} ${containerClasses[scenario.type]}`}>
            <div className="flex justify-between items-center text-sm font-semibold text-slate-300 mb-2 pb-2 border-b border-slate-600/50">
                <span>From: {scenario.sender}</span>
                <span>{scenario.type}</span>
            </div>
            {scenario.subject && <p className="font-bold text-slate-200 mb-2">Subject: {scenario.subject}</p>}
            <p className="text-slate-300 whitespace-pre-wrap">{scenario.scenario}</p>
        </div>
    );
};

export const IsThisAScamGame: React.FC<IsThisAScamGameProps> = ({ onBack, onWin }) => {
  const [questions, setQuestions] = useState<GameScenario[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null);
  const [isGameFinished, setIsGameFinished] = useState(false);

  const startGame = () => {
    const shuffled = [...gameScenarios].sort(() => 0.5 - Math.random());
    setQuestions(shuffled.slice(0, 5));
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowFeedback(false);
    setSelectedAnswer(null);
    setIsGameFinished(false);
  };
  
  useEffect(() => {
    startGame();
  }, []);

  const handleAnswer = (answer: boolean) => {
    setSelectedAnswer(answer);
    if (answer === questions[currentQuestionIndex].isScam) {
      setScore(score + 1);
    }
    setShowFeedback(true);
  };

  const handleNext = () => {
    setShowFeedback(false);
    setSelectedAnswer(null);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      if (score > 3) {
        onWin();
      }
      setIsGameFinished(true);
    }
  };

  const handlePlayAgain = () => {
    startGame();
  };
  
  if (questions.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-white text-lg">Loading Game...</p>
      </div>
    );
  }

  const currentScenario = questions[currentQuestionIndex];

  if (isGameFinished) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
            <h1 className="text-4xl font-bold text-cyan-400">Game Over!</h1>
            <p className="text-2xl text-white mt-4">Your Final Score: {score} / {questions.length}</p>
            <p className="text-slate-400 mt-2 max-w-md">
                {score > 3 ? "Excellent work! You've got a sharp eye for scams." : "Good try! Keep practicing to become a scam-spotting expert."}
            </p>
            <div className="flex space-x-4 mt-8">
                <button onClick={handlePlayAgain} className="bg-cyan-600 text-white font-bold py-3 px-6 rounded-md hover:bg-cyan-700 transition-colors">Play Again</button>
                <button onClick={onBack} className="bg-slate-700 text-white font-bold py-3 px-6 rounded-md hover:bg-slate-600 transition-colors">Back to Games</button>
            </div>
        </div>
    );
  }

  return (
    <div className="min-h-screen p-4 sm:p-6 md:p-8 flex flex-col items-center">
      <header className="w-full max-w-3xl flex justify-between items-center mb-8">
        <button
          onClick={onBack}
          className="p-2 rounded-full hover:bg-slate-700 transition-colors"
          aria-label="Go back"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-2xl md:text-3xl font-bold text-white">Is this a scam?</h1>
        <div className="text-lg font-bold text-cyan-400">Score: {score}</div>
      </header>

      <div className="w-full max-w-3xl">
        <p className="text-center text-slate-400 mb-6">Read the scenario below and decide if it's real or a scam.</p>
        <ScenarioDisplay scenario={currentScenario} />

        {!showFeedback && (
            <div className="flex justify-center gap-4 mt-8">
                <button onClick={() => handleAnswer(false)} className="px-10 py-4 font-bold text-white bg-green-600 rounded-lg hover:bg-green-700 transition-transform hover:scale-105">👍 Real</button>
                <button onClick={() => handleAnswer(true)} className="px-10 py-4 font-bold text-white bg-red-600 rounded-lg hover:bg-red-700 transition-transform hover:scale-105">👎 Scam</button>
            </div>
        )}

        {showFeedback && (
            <div className="mt-6 p-6 bg-slate-800 rounded-lg border border-slate-700 text-center">
                {selectedAnswer === currentScenario.isScam ? (
                    <h2 className="text-2xl font-bold text-green-400">Correct!</h2>
                ) : (
                    <h2 className="text-2xl font-bold text-red-400">Incorrect!</h2>
                )}
                <p className="text-lg text-slate-300 mt-2">The correct answer was: <span className="font-bold">{currentScenario.isScam ? 'Scam' : 'Real'}</span></p>
                <p className="text-slate-400 mt-4">{currentScenario.explanation}</p>
                <button onClick={handleNext} className="mt-6 bg-cyan-600 text-white font-bold py-3 px-8 rounded-md hover:bg-cyan-700 transition-colors">
                    {currentQuestionIndex < questions.length - 1 ? 'Next Scenario' : 'Finish Game'}
                </button>
            </div>
        )}
      </div>
    </div>
  );
};