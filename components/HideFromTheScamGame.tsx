import React, { useState, useCallback, useEffect } from 'react';
import { tasks, scams, Task, Scam } from '../data/hideGameData';

interface HideFromTheScamGameProps {
  onBack: () => void;
  onWin: () => void;
}

export const HideFromTheScamGame: React.FC<HideFromTheScamGameProps> = ({ onBack, onWin }) => {
  const [gameState, setGameState] = useState<'start' | 'playing' | 'result'>('start');
  const [actionPoints, setActionPoints] = useState(30);
  const [playerHealth, setPlayerHealth] = useState(3);
  const [wins, setWins] = useState(0);
  const [selectedTasks, setSelectedTasks] = useState<Set<string>>(new Set());
  const [currentScam, setCurrentScam] = useState<Scam | null>(null);
  const [scamDeck, setScamDeck] = useState<Scam[]>([]);
  const [roundIndex, setRoundIndex] = useState(0);
  const [resultMessage, setResultMessage] = useState({ title: '', message: '', success: false });

  const startNewRound = useCallback(() => {
    const nextIndex = roundIndex + 1;
    let deck = scamDeck;

    if (nextIndex >= deck.length) {
        deck = [...scams].sort(() => 0.5 - Math.random());
        setScamDeck(deck);
        setRoundIndex(0);
        setCurrentScam(deck[0]);
    } else {
        setRoundIndex(nextIndex);
        setCurrentScam(deck[nextIndex]);
    }

    setSelectedTasks(new Set());
    setActionPoints(30);
    setGameState('playing');
  }, [roundIndex, scamDeck]);

  const handleStartGame = useCallback(() => {
    setPlayerHealth(3);
    setWins(0);
    const initialDeck = [...scams].sort(() => 0.5 - Math.random());
    setScamDeck(initialDeck);
    setRoundIndex(0);
    setCurrentScam(initialDeck[0]);
    setSelectedTasks(new Set());
    setActionPoints(30);
    setGameState('playing');
  }, []);

  const handleTaskToggle = (task: Task) => {
    const newSelectedTasks = new Set(selectedTasks);
    if (newSelectedTasks.has(task.id)) {
      newSelectedTasks.delete(task.id);
      setActionPoints(prev => prev + task.timeCost);
    } else {
      if (actionPoints >= task.timeCost) {
        newSelectedTasks.add(task.id);
        setActionPoints(prev => prev - task.timeCost);
      }
    }
    setSelectedTasks(newSelectedTasks);
  };
  
  const handleSubmit = () => {
    if (!currentScam) return;
    
    const required = new Set(currentScam.requiredTasks);
    const isBlocked = [...required].every(taskId => selectedTasks.has(taskId));
    
    if (isBlocked) {
      const newWins = wins + 1;
      setWins(newWins);

      if (newWins === 5) {
        onWin();
      }

      const correctActions = currentScam.requiredTasks
        .map(taskId => tasks.find(t => t.id === taskId)?.name)
        .filter(Boolean)
        .join(', ');

      setResultMessage({
        title: 'SCAM BLOCKED!',
        message: `Excellent! You took the correct actions: ${correctActions}.`,
        success: true,
      });
    } else {
      setPlayerHealth(prev => prev - 1);
      
      const missingTasks = currentScam.requiredTasks
        .filter(taskId => !selectedTasks.has(taskId))
        .map(taskId => tasks.find(t => t.id === taskId)?.name)
        .filter(Boolean);

      let feedback = `The scammer got through! You lose one health point.`;
      if (missingTasks.length > 0) {
        feedback += ` You forgot key step(s): ${missingTasks.join(', ')}.`;
      }

      setResultMessage({
        title: 'SCAM SUCCESSFUL!',
        message: feedback,
        success: false,
      });
    }
    setGameState('result');
  };

  const renderStartScreen = () => (
    <div className="text-center">
      <h2 className="text-3xl font-bold text-white mb-4">How to Play: Prevent the Scam</h2>
      <p className="text-slate-300 max-w-xl mx-auto mb-6">
        A scam attempt is coming. You have "Action Points" (AP) to spend on security tasks.
        Select the correct tasks to block the scam. Successfully block <strong>5 scams</strong> to win the game!
      </p>
      <p className="text-lg text-fuchsia-400 font-bold mb-8">You have 3 health points. Don't let them run out!</p>
      <button onClick={handleStartGame} className="bg-fuchsia-600 text-white font-bold py-3 px-8 rounded-md hover:bg-fuchsia-700 transition-colors text-xl">Start Game</button>
    </div>
  );

  const renderRoundResultScreen = () => (
    <div className="text-center">
      <h2 className={`text-4xl font-bold mb-4 ${resultMessage.success ? 'text-green-400' : 'text-red-400'}`}>{resultMessage.title}</h2>
      <p className="text-slate-400 max-w-xl mx-auto mb-8 bg-slate-800 p-4 rounded-lg">{resultMessage.message}</p>
      <button onClick={startNewRound} className="bg-cyan-600 text-white font-bold py-3 px-8 rounded-md hover:bg-cyan-700 transition-colors text-xl">Next Round</button>
    </div>
  );
  
  const renderVictoryScreen = () => (
     <div className="text-center">
        <h2 className="text-4xl font-bold text-cyan-400 mb-4">🎉 YOU WIN! 🎉</h2>
        <p className="text-slate-300 max-w-xl mx-auto mb-8">Congratulations! You successfully blocked all scam attempts and secured your digital life. You're a true Scamolingo champion!</p>
        <button onClick={handleStartGame} className="bg-fuchsia-600 text-white font-bold py-3 px-8 rounded-md hover:bg-fuchsia-700 transition-colors">Play Again</button>
     </div>
  );

  const renderGameOverScreen = () => (
    <div className="text-center">
      <h2 className="text-4xl font-bold text-red-500 mb-4">GAME OVER</h2>
      <p className="text-slate-400 max-w-xl mx-auto mb-8 bg-slate-800 p-4 rounded-lg">{resultMessage.message}</p>
      <p className="text-slate-300 max-w-xl mx-auto mb-8">You've run out of health. Don't worry, practice makes perfect!</p>
      <button onClick={handleStartGame} className="bg-fuchsia-600 text-white font-bold py-3 px-8 rounded-md hover:bg-fuchsia-700 transition-colors">Play Again</button>
    </div>
  );

  const renderGameScreen = () => {
    if (!currentScam) return null;
    return (
        <div className="w-full">
            <div className="text-center mb-6 bg-slate-800/50 border border-slate-700 p-4 rounded-lg">
                <p className="text-md font-bold uppercase tracking-wider text-cyan-400">Round {wins + (3 - playerHealth) + 1}</p>
                <p className="text-sm font-bold uppercase tracking-wider text-red-400 mt-2">INCOMING SCAM</p>
                <h3 className="text-xl font-bold text-white mt-1">{currentScam.title}</h3>
                <p className="text-slate-400 mt-2 text-sm">{currentScam.description}</p>
            </div>

            <div className="text-center mb-6">
                <p className="text-lg text-slate-300">Remaining Action Points:</p>
                <p className={`text-5xl font-bold ${actionPoints < 10 ? 'text-red-500' : 'text-fuchsia-400'}`}>{actionPoints}</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
                {tasks.map(task => {
                    const isSelected = selectedTasks.has(task.id);
                    const canAfford = actionPoints >= task.timeCost;
                    return (
                        <button 
                            key={task.id}
                            onClick={() => handleTaskToggle(task)}
                            disabled={!isSelected && !canAfford}
                            className={`p-4 rounded-lg border text-center transition-all duration-200 h-full flex flex-col justify-between ${
                                isSelected 
                                    ? 'bg-cyan-500 border-cyan-400 text-white ring-2 ring-cyan-300' 
                                    : canAfford 
                                    ? 'bg-slate-800 border-slate-600 hover:border-cyan-500 hover:bg-slate-700'
                                    : 'bg-slate-800 border-slate-700 text-slate-500 cursor-not-allowed opacity-60'
                            }`}
                        >
                            <div>
                                <span className="text-2xl">{task.icon}</span>
                                <p className="font-bold text-sm mt-1">{task.name}</p>
                            </div>
                            <p className={`text-xs font-semibold mt-2 ${isSelected ? 'text-cyan-100' : 'text-fuchsia-400'}`}>
                                {task.timeCost} AP
                            </p>
                        </button>
                    )
                })}
            </div>
            
            <div className="text-center">
                <button
                    onClick={handleSubmit}
                    disabled={selectedTasks.size === 0}
                    className="bg-green-600 text-white font-bold py-3 px-12 rounded-md hover:bg-green-700 transition-colors text-xl disabled:bg-slate-600 disabled:cursor-not-allowed"
                >
                    Block the Scam!
                </button>
            </div>
        </div>
    );
  };

  return (
    <div className="min-h-screen p-4 sm:p-6 md:p-8 flex flex-col items-center">
      <header className="w-full max-w-4xl flex justify-between items-center mb-8">
        <button onClick={onBack} className="p-2 rounded-full hover:bg-slate-700 transition-colors" aria-label="Go back">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="text-lg font-bold text-cyan-400">
            Scams Blocked: {wins} / 5
        </div>
        <div className="text-lg font-bold text-red-500 flex items-center">
          {`Health: `}
          {Array.from({ length: playerHealth }).map((_, i) => <span key={i} className="ml-1">❤️</span>)}
          {Array.from({ length: 3 - playerHealth }).map((_, i) => <span key={i} className="ml-1">🖤</span>)}
        </div>
      </header>
      <main className="w-full max-w-4xl flex-grow flex items-center justify-center">
        {gameState === 'start' && renderStartScreen()}
        {gameState === 'playing' && renderGameScreen()}
        {gameState === 'result' && (
            <>
                {wins === 5 && renderVictoryScreen()}
                {playerHealth === 0 && renderGameOverScreen()}
                {wins < 5 && playerHealth > 0 && renderRoundResultScreen()}
            </>
        )}
      </main>
    </div>
  );
};
