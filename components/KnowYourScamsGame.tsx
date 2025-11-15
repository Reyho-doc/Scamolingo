import React, { useState, useEffect, useCallback } from 'react';
import { knowYourScamsData, KnowYourScamsScenario } from '../data/knowYourScamsGameData';

interface KnowYourScamsGameProps {
  onBack: () => void;
  onWin: () => void;
}

const scamTypesReference = [
    'Overlay Attack', 'Rogue Keyboard', 'Repackaging', 'Mobile Phishing (Smishing)',
    'Mobile Banking Trojan', 'Man-in-the-Middle (MITM)', 'SIM Swapping', 'Reverse Engineering'
];

export const KnowYourScamsGame: React.FC<KnowYourScamsGameProps> = ({ onBack, onWin }) => {
  const [questions, setQuestions] = useState<KnowYourScamsScenario[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [gameState, setGameState] = useState<'playing' | 'finished'>('playing');

  const startGame = useCallback(() => {
    const shuffled = [...knowYourScamsData].sort(() => 0.5 - Math.random());
    setQuestions(shuffled.slice(0, 5));
    setCurrentIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setGameState('playing');
  }, []);

  useEffect(() => {
    startGame();
  }, [startGame]);

  const handleSelectOption = (index: number) => {
    if (showResult) return;
    setSelectedAnswer(index);
  };

  const handleSubmit = () => {
    if (selectedAnswer === null) return;
    if (selectedAnswer === questions[currentIndex].correctIndex) {
        setScore(prev => prev + 1);
    }
    setShowResult(true);
  }

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      if (score >= 4) {
        onWin();
      }
      setGameState('finished');
    }
  };

  if (questions.length === 0) {
    return <div className="min-h-screen flex items-center justify-center"><p>Loading Game...</p></div>;
  }

  if (gameState === 'finished') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
        <h1 className="text-4xl font-bold text-amber-400">Quiz Complete!</h1>
        <p className="text-2xl text-white mt-4">Your Final Score: {score} / {questions.length}</p>
        <p className="text-slate-400 mt-2 max-w-md">
          {score >= 4 ? "Impressive! You know your stuff when it comes to technical scams." : "Good effort! Review the explanations to sharpen your knowledge."}
        </p>
        <div className="flex space-x-4 mt-8">
          <button onClick={startGame} className="bg-amber-600 text-white font-bold py-3 px-6 rounded-md hover:bg-amber-700 transition-colors">Play Again</button>
          <button onClick={onBack} className="bg-slate-700 text-white font-bold py-3 px-6 rounded-md hover:bg-slate-600 transition-colors">Back to Games</button>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];
  const progressPercentage = ((currentIndex) / questions.length) * 100;

  return (
    <div className="min-h-screen p-4 sm:p-6 md:p-8">
      <header className="flex items-center mb-6">
        <button onClick={onBack} className="mr-4 p-2 rounded-full hover:bg-slate-700 transition-colors" aria-label="Go back">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        </button>
        <h1 className="text-2xl md:text-3xl font-bold text-white">Know Your Scams</h1>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <section className="lg:col-span-2 bg-slate-800/50 border border-slate-700 rounded-lg p-6">
          <div className="flex justify-between items-center text-slate-400 font-semibold text-sm mb-4">
            <span>Question {currentIndex + 1} of {questions.length}</span>
            <span>Score: {score}</span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-2.5 mb-6">
            <div className="bg-amber-500 h-2.5 rounded-full" style={{ width: `${progressPercentage}%`, transition: 'width 0.3s' }}></div>
          </div>

          <p className="text-lg text-slate-300 p-4 bg-slate-900/50 rounded-md min-h-[100px]">{currentQuestion.text}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            {currentQuestion.options.map((option, index) => {
              let buttonClass = 'bg-slate-800 border-slate-600 hover:bg-slate-700 hover:border-amber-500';
              if (showResult) {
                if (index === currentQuestion.correctIndex) {
                  buttonClass = 'bg-green-500/80 border-green-400 text-white';
                } else if (index === selectedAnswer) {
                  buttonClass = 'bg-red-500/80 border-red-400 text-white';
                } else {
                  buttonClass = 'bg-slate-700 border-slate-600 opacity-60';
                }
              } else if (index === selectedAnswer) {
                 buttonClass = 'bg-slate-700 border-amber-500 ring-2 ring-amber-500';
              }
              return (
                <button
                  key={index}
                  onClick={() => handleSelectOption(index)}
                  disabled={showResult}
                  className={`p-4 rounded-lg border text-left font-semibold transition-all duration-200 ${buttonClass}`}
                >
                  {option}
                </button>
              );
            })}
          </div>

          {showResult && (
            <div className="mt-6 p-4 bg-slate-900/50 rounded-lg">
                <h3 className={`text-xl font-bold ${selectedAnswer === currentQuestion.correctIndex ? 'text-green-400' : 'text-red-400'}`}>
                    {selectedAnswer === currentQuestion.correctIndex ? 'Correct!' : 'Incorrect!'}
                </h3>
              <p className="text-slate-400 mt-2">{currentQuestion.explanation}</p>
              <div className="mt-3 pt-3 border-t border-slate-700">
                <h4 className="font-semibold text-slate-300">Prevention Tips:</h4>
                <ul className="list-disc list-inside text-slate-400 text-sm mt-1 space-y-1">
                    {currentQuestion.prevention.map((tip, i) => <li key={i}>{tip}</li>)}
                </ul>
              </div>
            </div>
          )}

          <div className="mt-6 flex justify-end">
            { !showResult ? (
                <button
                    onClick={handleSubmit}
                    disabled={selectedAnswer === null}
                    className="bg-green-600 text-white font-bold py-3 px-8 rounded-md hover:bg-green-700 transition-colors disabled:bg-slate-600 disabled:cursor-not-allowed"
                >
                    Submit
                </button>
            ) : (
                <button
                    onClick={handleNext}
                    className="bg-amber-600 text-white font-bold py-3 px-8 rounded-md hover:bg-amber-700 transition-colors"
                >
                    {currentIndex < questions.length - 1 ? 'Next' : 'Finish'}
                </button>
            )}
          </div>
        </section>

        <aside className="hidden lg:block bg-slate-800/50 border border-slate-700 rounded-lg p-6 h-fit sticky top-8">
          <h3 className="text-lg font-bold text-slate-300 mb-3">Scam Types Reference</h3>
          <ol className="list-decimal list-inside text-slate-400 space-y-1 text-sm">
            {scamTypesReference.map(type => <li key={type}>{type}</li>)}
          </ol>
           <p className="text-xs text-slate-500 mt-4 pt-3 border-t border-slate-700">
             Tip: Use 2FA, official app stores, verify links, and don’t share OTPs.
           </p>
        </aside>
      </div>
    </div>
  );
};