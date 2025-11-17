import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { WEBSITE_CASES, MESSAGES, SHOP_ITEMS, APP_POOL, WebsiteCase, Message, ShopItem, GameTools, Objective, AppProfile } from '../data/whiteHatGameData';

// --- Helper Components & Icons ---

const levenshteinDistance = (s1: string, s2: string): number => {
    if (s1.length > s2.length) {
        [s1, s2] = [s2, s1];
    }
    const distances = Array.from({ length: s1.length + 1 }, (_, i) => i);
    for (let j = 0; j < s2.length; j++) {
        let previousDiagonal = distances[0];
        distances[0]++;
        for (let i = 0; i < s1.length; i++) {
            const temp = distances[i + 1];
            if (s1[i] === s2[j]) {
                distances[i + 1] = previousDiagonal;
            } else {
                distances[i + 1] = Math.min(previousDiagonal, distances[i], distances[i + 1]) + 1;
            }
            previousDiagonal = temp;
        }
    }
    return distances[s1.length];
};

const CheckCircleIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.06-1.06L10.939 12.88l-1.854-1.853a.75.75 0 0 0-1.06 1.06l2.5 2.5a.75.75 0 0 0 1.06 0l4.25-4.25Z" clipRule="evenodd" />
    </svg>
);

const LogPanel: React.FC<{ logs: string[] }> = ({ logs }) => (
     <div className="h-20 overflow-y-auto flex flex-col-reverse p-2 text-center">
        <div className="flex flex-col-reverse font-mono text-xs text-slate-500">
            {logs.map((log, i) => <div key={i} className="py-0.5 whitespace-pre-wrap break-words">{log}</div>)}
        </div>
    </div>
);


// --- Minigame Components ---

type MiniGameProps = {
    tools: GameTools;
    log: (message: string) => void;
    setRep: React.Dispatch<React.SetStateAction<number>>;
    onComplete: () => void;
};

// Analyze Message Minigame
const AnalyzeMessageGame: React.FC<MiniGameProps & { message: Message }> = ({ message, tools, log, setRep, onComplete }) => {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);

    const visibleOptions = useMemo(() => {
        const allOpts = ["Mobile Phishing (Smishing)", "Repackaging / Phishing", "Rogue Keyboard", "Man-in-the-Middle"];
        if (tools.scannerLevel <= 1) return allOpts.sort(() => 0.5 - Math.random());

        const incorrectOptions = allOpts.filter(o => o !== message.correct);
        const shuffledIncorrect = [...incorrectOptions].sort(() => 0.5 - Math.random());
        const optionsToRemoveCount = Math.min(tools.scannerLevel - 1, 2);
        const incorrectToRemove = new Set(shuffledIncorrect.slice(0, optionsToRemoveCount));

        return allOpts.filter(o => !incorrectToRemove.has(o)).sort(() => 0.5 - Math.random());
    }, [message.correct, tools.scannerLevel]);
    
    const handleSelection = async (option: string) => {
        if(isSubmitted) return;
        setSelectedOption(option);
        setIsSubmitted(true);

        const delay = Math.max(400, 1400 - (tools.scannerLevel * 200));
        log("Analyzing message...");
        await new Promise(res => setTimeout(res, delay));

        if (option === message.correct) {
            const repGain = 10 + tools.scannerLevel * 2;
            setRep(r => r + repGain);
            log(`Analysis correct! +${repGain} Rep. ${message.teach}`);
            onComplete();
        } else {
            const repLoss = 5;
            setRep(r => r - repLoss);
            const incorrectInfo = message.incorrectFeedback.find(fb => fb.option === option);
            const feedback = incorrectInfo ? incorrectInfo.feedback : "That was not the correct classification for this type of threat.";
            log(`Analysis incorrect. -${repLoss} Rep. ${feedback} The correct answer was: ${message.correct}.`);
        }
    };

    return (
        <div>
            <h3 className="text-lg font-bold text-center mb-4">Analyze Message</h3>
            <div className="text-sm p-3 bg-slate-900/50 rounded-md">
                <p><strong>From:</strong> {message.from}</p>
                <p><strong>Subject:</strong> {message.subject}</p>
            </div>
            <p className="text-center my-3">What type of scam is this?</p>
            <div className="grid grid-cols-2 gap-2">
                {visibleOptions.map(o => {
                    let buttonClass = 'p-2 bg-slate-700 rounded-md hover:bg-cyan-600 disabled:cursor-not-allowed';
                     if (isSubmitted) {
                        if (o === message.correct) {
                            buttonClass = 'p-2 bg-green-600 rounded-md text-white font-bold';
                        } else if (o === selectedOption) {
                            buttonClass = 'p-2 bg-red-600 rounded-md text-white';
                        } else {
                            buttonClass = 'p-2 bg-slate-800 rounded-md text-slate-500 opacity-60';
                        }
                    }
                    return (
                        <button key={o} onClick={() => handleSelection(o)} disabled={isSubmitted} className={buttonClass}>
                            {o}
                        </button>
                    )
                })}
            </div>
        </div>
    );
};

// Domain Detective Minigame
const DomainDetectiveGame: React.FC<MiniGameProps & { message: Message }> = ({ message, tools, log, setRep, onComplete }) => {
    const [domainInput, setDomainInput] = useState('');
    const [analysisResult, setAnalysisResult] = useState<React.ReactNode>(null);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const analyzeDomain = async () => {
        if (isSubmitted) return;
        const rawInput = domainInput.trim();
        if (!rawInput) return;
        
        setIsSubmitted(true);
        setAnalysisResult(<p>Analyzing...</p>);
        await new Promise(res => setTimeout(res, 600 - tools.domainLevel * 80));
        
        const domainToAnalyze = rawInput.includes('@') ? rawInput.split('@')[1] : rawInput;

        const isCorrect = message.maliciousDomains.some(d => 
            levenshteinDistance(domainToAnalyze.toLowerCase(), d.toLowerCase()) <= tools.domainLevel - 1
        );

        if (isCorrect) {
            const repGain = 10 + tools.domainLevel;
            setRep(r => r + repGain);
            log(`Domain match! Correctly identified malicious domain: ${domainToAnalyze}. +${repGain} Rep.`);
            setAnalysisResult(
                <div>
                    <p className="font-bold text-green-400">Threat Confirmed!</p>
                    <p className="text-sm mt-2">The domain <span className="font-mono bg-slate-900 p-1 rounded">{domainToAnalyze}</span> is a key part of this scam operation.</p>
                </div>
            );
             onComplete();
        } else {
             const repLoss = 5;
             setRep(r => r - repLoss);
             log(`Incorrect domain. -${repLoss} Rep. A correct domain was ${message.maliciousDomains[0]}.`);
            setAnalysisResult(
                <div>
                    <p className="font-bold text-red-400">Analysis Failed.</p>
                    <p className="text-sm mt-2">That was not a correct domain for this case. A correct domain was: <span className="font-mono bg-slate-900 p-1 rounded">{message.maliciousDomains[0]}</span></p>
                </div>
            );
        }
    };
    
    if (!message.maliciousDomains || message.maliciousDomains.length === 0) {
        return (
            <div className="text-center text-red-400">
                <h3 className="font-bold text-lg mb-2">Configuration Error</h3>
                <p>No malicious domains are defined for this case.</p>
            </div>
        );
    }

    return (
        <div className="text-center w-full">
            <h3 className="font-bold text-lg mb-2">Domain Detective</h3>
            <p className="text-sm text-slate-400 mb-4">Type a suspicious domain from the message to analyze for malicious intent.</p>
            <div className="flex gap-2">
                <input 
                    value={domainInput} 
                    onChange={e => setDomainInput(e.target.value)} 
                    disabled={isSubmitted}
                    className="w-full bg-slate-900 p-2 rounded-md border border-slate-600 focus:ring-cyan-500 focus:border-cyan-500 text-white disabled:bg-slate-800" 
                    placeholder="e.g., dh1-express.com" 
                />
                <button 
                    onClick={analyzeDomain} 
                    disabled={isSubmitted || !domainInput}
                    className="p-2 px-4 bg-cyan-600 rounded-md hover:bg-cyan-700 font-semibold disabled:bg-slate-600 disabled:cursor-not-allowed"
                >
                    Analyze
                </button>
            </div>
            <div className="mt-4 text-left p-2 bg-slate-900/50 rounded-md min-h-[50px]">
                {analysisResult}
            </div>
        </div>
    );
};


// App Inspector Minigame
const AppInspectorGame: React.FC<MiniGameProps> = ({ log, setRep, onComplete }) => {
    const [app] = useState<AppProfile>(() => APP_POOL[Math.floor(Math.random() * APP_POOL.length)]);
    const [selectedChoice, setSelectedChoice] = useState<boolean | null>(null);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChoice = (isMarkedMalicious: boolean) => {
        if (isSubmitted) return;
        
        setSelectedChoice(isMarkedMalicious);
        setIsSubmitted(true);

        if (isMarkedMalicious === app.isMalicious) {
            const repGain = app.isMalicious ? 10 : 6;
            setRep(r => r + repGain);
            log(`Correct! App analysis successful. +${repGain} Rep. ${app.teach}`);
            onComplete();
        } else {
            const repLoss = 5;
            setRep(r => r - repLoss);
            log(`Incorrect app assessment. -${repLoss} Rep. Correct assessment was: ${app.isMalicious ? 'Malicious' : 'Safe'}. ${app.teach}`);
        }
    };
    
    const getButtonClass = (isMaliciousButton: boolean) => {
        const base = 'p-2 rounded-md disabled:cursor-not-allowed';
        if (!isSubmitted) {
            return `${base} ${isMaliciousButton ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'}`;
        }
        const isCorrectChoice = app.isMalicious === isMaliciousButton;
        const isSelectedChoice = selectedChoice === isMaliciousButton;

        if (isCorrectChoice) return `${base} bg-green-500 font-bold`;
        if (isSelectedChoice) return `${base} bg-red-500`;
        return `${base} bg-slate-600 opacity-60`;
    };

    return (
        <div>
            <h3 className="text-lg font-bold text-center mb-2">App Inspector</h3>
            <p className="text-center text-sm text-slate-400">Inspect app: <strong>{app.name}</strong></p>
            <ul className="text-xs list-disc list-inside bg-slate-900/50 p-2 my-2 rounded-md">
                {app.signature.map(sig => <li key={sig}>{sig}</li>)}
            </ul>
            <div className="flex justify-center gap-2 mt-4">
                <button onClick={() => handleChoice(false)} disabled={isSubmitted} className={getButtonClass(false)}>Mark Safe</button>
                <button onClick={() => handleChoice(true)} disabled={isSubmitted} className={getButtonClass(true)}>Mark Malicious</button>
            </div>
        </div>
    );
};

// Botnet Takedown Minigame
const BotnetTakedownGame: React.FC<MiniGameProps> = ({ tools, log, setRep, onComplete }) => {
    const [bots, setBots] = useState(() => Array.from({ length: 8 + tools.botnetTools * 2 }, () => true));
    const [isSubmitted, setIsSubmitted] = useState(false);
    const aliveCount = bots.filter(Boolean).length;

    const handleBotClick = (index: number) => {
        const base = 50 + tools.botnetTools * 15;
        const roll = Math.random() * 100;
        log(`Takedown attempt on BOT ${index + 1} (Roll: ${Math.round(roll)} vs Chance: ${base})`);
        if (roll < base) {
            const newBots = [...bots];
            newBots[index] = false;
            setBots(newBots);
        }
    };
    
    useEffect(() => {
        if(aliveCount === 0 && !isSubmitted) {
             setIsSubmitted(true);
             const repGain = 15 + tools.botnetTools * 2;
             setRep(r => r + repGain);
             log(`Botnet neutralized! +${repGain} Rep.`);
             onComplete();
        }
    }, [aliveCount, isSubmitted, tools.botnetTools, log, setRep, onComplete]);

    return (
        <div className="text-center">
            <h3 className="font-bold text-lg mb-2">Botnet Shutdown</h3>
            <p className="text-sm text-slate-400 mb-4">Bots Alive: {aliveCount}</p>
            <div className="grid grid-cols-5 gap-2">
                {bots.map((isAlive, i) => (
                    <button key={i} onClick={() => handleBotClick(i)} disabled={!isAlive || isSubmitted}
                        className={`h-12 w-12 rounded-md text-xs font-bold ${isAlive ? 'bg-red-500 animate-pulse' : 'bg-slate-600 opacity-50'}`}>
                        BOT
                    </button>
                ))}
            </div>
        </div>
    );
};

const PacketPathMazeGame: React.FC<MiniGameProps> = ({ tools, log, setRep, onComplete }) => {
    type NodeType = 'START' | 'END' | 'VALID' | 'SPOOFED' | 'PROXY' | 'DEAD_END';
    type MazeNode = { type: NodeType; row: number; col: number };
    type PathCoord = { row: number; col: number };

    const [maze, setMaze] = useState<MazeNode[][]>([]);
    const [path, setPath] = useState<PathCoord[]>([]);
    const [isSubmitted, setIsSubmitted] = useState(false);
    
    const generateMaze = useCallback((level: number) => {
        const size = 5 + Math.min(level -1, 3);
        const newMaze: MazeNode[][] = Array.from({ length: size }, (_, row) =>
            Array.from({ length: size }, (_, col) => ({ type: 'DEAD_END', row, col }))
        );

        newMaze[0][0].type = 'START';
        newMaze[size - 1][size - 1].type = 'END';
        setPath([{ row: 0, col: 0 }]);

        let r=0, c=0;
        newMaze[r][c].type = 'VALID';
        while (r < size - 1 || c < size - 1) {
            const canGoDown = r < size - 1;
            const canGoRight = c < size - 1;
            if (canGoDown && (Math.random() > 0.5 || !canGoRight)) {
                r++;
            } else if(canGoRight) {
                c++;
            }
            newMaze[r][c].type = 'VALID';
        }
        newMaze[0][0].type = 'START';
        newMaze[size - 1][size - 1].type = 'END';

        for (let r = 0; r < size; r++) {
            for (let c = 0; c < size; c++) {
                if (newMaze[r][c].type === 'DEAD_END') {
                    const rand = Math.random();
                    if (rand < 0.25) newMaze[r][c].type = 'SPOOFED';
                    else if (rand < 0.5) newMaze[r][c].type = 'PROXY';
                    else if (rand < 0.7) newMaze[r][c].type = 'VALID';
                }
            }
        }
        setMaze(newMaze);
    }, []);

    useEffect(() => {
        generateMaze(tools.traceLevel);
    }, [tools.traceLevel, generateMaze]);

    const handleNodeClick = (node: MazeNode) => {
        if (isSubmitted) return;
        const lastNode = path[path.length - 1];
        if (Math.abs(node.row - lastNode.row) + Math.abs(node.col - lastNode.col) !== 1) return;

        if (path.length > 1 && path[path.length - 2].row === node.row && path[path.length - 2].col === node.col) {
            log("Backtracking...");
            setPath(p => p.slice(0, -1));
            return;
        }
        if (path.some(p => p.row === node.row && p.col === node.col)) {
            log("Invalid move: Path cannot cross itself.");
            return;
        }

        switch (node.type) {
            case 'SPOOFED':
                const repLoss = 5;
                setRep(r => r - repLoss);
                log(`Path corrupted by spoofed router! -${repLoss} Rep. Resetting trace.`);
                setPath([{ row: 0, col: 0 }]);
                break;
            case 'PROXY':
                log("Detour through a proxy... Path continues.");
                setPath(p => [...p, { row: node.row, col: node.col }]);
                break;
            case 'DEAD_END':
                log("Path blocked by a dead-end. Backtrack.");
                break;
            case 'VALID':
            case 'START':
                setPath(p => [...p, { row: node.row, col: node.col }]);
                break;
            case 'END':
                setIsSubmitted(true);
                const finalPath = [...path, { row: node.row, col: node.col }];
                const uniqueProxies = new Set(
                    finalPath.map(p => maze[p.row][p.col].type === 'PROXY' ? `${p.row},${p.col}` : null).filter(Boolean)
                );
                const proxyBonus = uniqueProxies.size * (2 + tools.traceLevel);
                const repGain = 8 + tools.traceLevel * 2 + proxyBonus;
                setRep(r => r + repGain);
                log(`Trace successful! +${repGain} Rep (including +${proxyBonus} from ${uniqueProxies.size} unique proxies).`);
                onComplete();
                break;
        }
    };

    const nodeStyles: Record<NodeType, string> = {
        START: "bg-green-700 text-xs", END: "bg-fuchsia-700 text-xs",
        VALID: "bg-slate-700 hover:bg-cyan-600", SPOOFED: "bg-red-700 hover:bg-red-600",
        PROXY: "bg-blue-700 hover:bg-blue-600", DEAD_END: "bg-slate-800 opacity-50 cursor-not-allowed"
    };
    
    return (
        <div className="text-center">
            <h3 className="font-bold text-lg mb-2">Packet Path Maze</h3>
            <div className="text-xs text-slate-400 mb-4 bg-slate-900/50 p-2 rounded-md leading-relaxed">
                <p><strong>Legend:</strong></p>
                <p>🟩 Start | 🟪 End | ⬜ Valid</p>
                <p>🟦 Proxy (Bonus Rep) | 🟥 Spoofed (Resets & -5 Rep)</p>
                <p><span className="inline-block w-3 h-3 bg-slate-800 opacity-50 rounded-sm align-middle"></span> Dead-End</p>
            </div>
            <div className={`grid gap-1`} style={{gridTemplateColumns: `repeat(${maze.length}, minmax(0, 1fr))`}}>
                {maze.flat().map((node, i) => {
                    const inPath = path.some(p => p.row === node.row && p.col === node.col);
                    return (
                        <button key={i} onClick={() => handleNodeClick(node)}
                            disabled={isSubmitted}
                            className={`aspect-square rounded-md transition-all ${nodeStyles[node.type]} ${inPath ? 'ring-2 ring-yellow-300' : ''}`}
                        >
                            {node.type === 'START' && 'START'}
                            {node.type === 'END' && 'END'}
                        </button>
                    )
                })}
            </div>
        </div>
    );
};


// --- Main Game Component ---
interface WhiteHatGameProps {
  onBack: () => void;
  onWin: () => void;
}

export const WhiteHatGame: React.FC<WhiteHatGameProps> = ({ onBack, onWin }) => {
    // Game State
    const [rep, setRep] = useState(0);
    const [tools, setTools] = useState<GameTools>({ scannerLevel: 1, traceLevel: 1, domainLevel: 1, botnetTools: 1 });
    const [websiteCases, setWebsiteCases] = useState<WebsiteCase[]>([]);
    const [logs, setLogs] = useState<string[]>([]);
    const [selectedCaseId, setSelectedCaseId] = useState<number | null>(null);
    const [stageContent, setStageContent] = useState<React.ReactNode>(null);
    const [gameState, setGameState] = useState<'intro' | 'playing' | 'all_complete' | 'game_over_time'>('intro');
    const [timeLeft, setTimeLeft] = useState(300);
    const [retryCounter, setRetryCounter] = useState(0);

    const WelcomeScreen = useMemo(() => (
      <div className="text-center">
        <h3 className="text-2xl font-bold text-cyan-400">Welcome, Agent</h3>
        <p className="text-slate-400 mt-2">Select a case from the inbox to begin your investigation.</p>
      </div>
    ), []);

    const objectiveDescriptions: Record<string, { title: string, description: string }> = {
        analyze: { title: "Analyze Message", description: "Classify the scam from the inbox." },
        trace: { title: "Trace Route", description: "Find the origin server of the attack." },
        domain: { title: "Domain Intel", description: "Analyze the suspicious URL for threats." },
        app: { title: "Inspect App", description: "Check the attached mobile app for malware." },
        botnet: { title: "Botnet Takedown", description: "Neutralize an associated botnet." },
    };

    const log = useCallback((message: string) => {
        const time = new Date().toLocaleTimeString('en-US', { hour12: true, hour: '2-digit', minute: '2-digit', second: '2-digit' });
        setLogs(prev => [`[${time}] ${message}`, ...prev].slice(0, 50));
    }, []);
    
    const startGame = useCallback(() => {
        setRep(0);
        setTools({ scannerLevel: 1, traceLevel: 1, domainLevel: 1, botnetTools: 1 });
        const allCases = JSON.parse(JSON.stringify(WEBSITE_CASES));
        const shuffled = allCases.sort(() => 0.5 - Math.random());
        setWebsiteCases(shuffled.slice(0, 3));
        setLogs([]);
        setSelectedCaseId(null);
        setStageContent(WelcomeScreen);
        log("Game started. Awaiting your command.");
        setTimeLeft(300);
        setGameState('playing');
    }, [WelcomeScreen, log]);
    
    useEffect(() => {
        if (gameState !== 'playing') return;

        if (timeLeft <= 0) {
            log("Time's up! Mission failed.");
            setGameState('game_over_time');
            return;
        }

        const timerId = setInterval(() => {
            setTimeLeft(t => t - 1);
        }, 1000);

        return () => clearInterval(timerId);
    }, [gameState, timeLeft, log]);

    const selectCase = (id: number) => {
        const selected = websiteCases.find(c => c.id === id);
        if (selected?._isComplete) return;
        setSelectedCaseId(id);
        setStageContent(WelcomeScreen);
        log(`Selected Case: ${MESSAGES[id].subject}`);
    };

    const markObjectiveDone = useCallback((caseId: number, type: Objective['type']) => {
        setWebsiteCases(currentCases => {
            const newCases = [...currentCases];
            const caseToUpdate = newCases.find(c => c.id === caseId);
            if (!caseToUpdate) return currentCases;

            const objectiveToUpdate = caseToUpdate.objectives.find(o => o.type === type && !o._done);
            if(objectiveToUpdate) {
                objectiveToUpdate._done = true;
                log(`Objective complete for Case: ${objectiveDescriptions[type].title}`);
                
                const allObjectivesDone = caseToUpdate.objectives.every(o => o._done);
                if (allObjectivesDone && !caseToUpdate._isComplete) {
                    caseToUpdate._isComplete = true;
                    setRep(r => r + caseToUpdate.reward);
                    log(`Case "${caseToUpdate.title}" closed. +${caseToUpdate.reward} Reputation.`);
                    setSelectedCaseId(null);
                    setStageContent(WelcomeScreen);
                }
            }
            return newCases;
        });
    }, [log, objectiveDescriptions, WelcomeScreen]);

    useEffect(() => {
        if (gameState !== 'playing' || websiteCases.length === 0) return;
        const allCasesComplete = websiteCases.every(c => c._isComplete);
        if (allCasesComplete) {
             if (rep > 50) {
                 log("All cases solved with high reputation! VICTORY!");
                 onWin();
                 setGameState('all_complete');
             } else {
                 log("All cases solved, but reputation is too low. Mission successful, but more to improve.");
                 setGameState('all_complete');
             }
        }
    }, [websiteCases, gameState, rep, onWin, log]);

    const handleBuy = (item: ShopItem) => {
        if (rep >= item.cost) {
            setRep(r => r - item.cost);
            setTools(t => item.apply(t));
            log(`Purchased ${item.name}.`);
        } else {
            log("Not enough Reputation.");
        }
    };

    const isObjectiveAvailable = (type: Objective['type']): boolean => {
        if (selectedCaseId === null) return false;
        const currentCase = websiteCases.find(c => c.id === selectedCaseId);
        if (!currentCase || currentCase._isComplete) return false;
        return currentCase.objectives.some(obj => obj.type === type && !obj._done);
    };

    const startTool = (type: 'analyze' | 'trace' | 'domain' | 'app' | 'botnet') => {
        if (selectedCaseId === null) {
            log("Select a case from the inbox first.");
            return;
        }
        if (!isObjectiveAvailable(type)) {
            log(`Tool "${objectiveDescriptions[type].title}" is not relevant or is already completed for this case.`);
            return;
        }

        setRetryCounter(c => c + 1); // Increment to force remount for retries
        const key = `${type}-${selectedCaseId}-${retryCounter}`;
        const onComplete = () => markObjectiveDone(selectedCaseId, type);
        
        switch (type) {
            case 'analyze':
                setStageContent(<AnalyzeMessageGame key={key} message={MESSAGES[selectedCaseId]} tools={tools} log={log} setRep={setRep} onComplete={onComplete} />);
                break;
            case 'trace':
                setStageContent(<PacketPathMazeGame key={key} tools={tools} log={log} setRep={setRep} onComplete={onComplete} />);
                break;
            case 'domain':
                 setStageContent(<DomainDetectiveGame key={key} message={MESSAGES[selectedCaseId]} tools={tools} log={log} setRep={setRep} onComplete={onComplete} />);
                 break;
            case 'app':
                setStageContent(<AppInspectorGame key={key} tools={tools} log={log} setRep={setRep} onComplete={onComplete} />);
                break;
            case 'botnet':
                setStageContent(<BotnetTakedownGame key={key} tools={tools} log={log} setRep={setRep} onComplete={onComplete} />);
                break;
        }
    };
    
    useEffect(() => {
        startGame();
    }, [startGame]);
    
    const GameOverTimeScreen = useMemo(() => (
        <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
            <h1 className="text-3xl font-bold text-red-500">TIME'S UP!</h1>
            <p className="text-slate-300 max-w-xl my-4">You ran out of time to complete the investigation. The scam networks continue their operations.</p>
            <div className="flex gap-4">
                <button onClick={startGame} className="text-lg font-bold bg-cyan-600 py-2 px-6 rounded-md hover:bg-cyan-700">Play Again</button>
                <button onClick={onBack} className="text-lg font-bold bg-slate-600 py-2 px-6 rounded-md hover:bg-slate-700">Return to Games</button>
            </div>
        </div>
    ), [startGame, onBack]);

    if (gameState === 'intro') {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
                <h1 className="text-3xl font-bold text-cyan-400">White-Hat: Stop the Scam Network</h1>
                <p className="text-slate-300 max-w-xl my-4">You are a cybersecurity researcher. Your mission is to investigate suspicious cases, analyze threats, trace their infrastructure, and shut down their operations. Complete all cases with over 50 Reputation within 5 minutes to win.</p>
                <button onClick={startGame} className="text-xl font-bold bg-cyan-600 py-3 px-8 rounded-md hover:bg-cyan-700">Start Investigation</button>
            </div>
        );
    }
    
    if (gameState === 'game_over_time') {
        return GameOverTimeScreen;
    }

    if (gameState === 'all_complete') {
        const isWin = rep > 50;
        return (
            <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
                <h1 className={`text-3xl font-bold ${isWin ? 'text-green-400' : 'text-amber-400'}`}>
                    {isWin ? '🎉 INVESTIGATION SUCCESSFUL! 🎉' : 'Cases Closed'}
                </h1>
                <p className="text-slate-300 max-w-xl my-4">
                    {isWin 
                        ? "You have successfully disrupted all major scam networks. Your skills have made the digital world a safer place. Great work, white-hat!" 
                        : `You've closed all cases, but your final reputation of ${rep} didn't meet the victory threshold of 51. The networks were disrupted, but the masterminds remain.`
                    }
                </p>
                <div className="flex gap-4">
                     <button onClick={startGame} className="text-lg font-bold bg-cyan-600 py-2 px-6 rounded-md hover:bg-cyan-700">Play Again</button>
                     <button onClick={onBack} className="text-lg font-bold bg-slate-600 py-2 px-6 rounded-md hover:bg-slate-700">Return to Games</button>
                </div>
            </div>
        );
    }
    
    const currentCase = selectedCaseId !== null ? websiteCases.find(c => c.id === selectedCaseId) : null;
    const toolLevelMap: Record<string, number> = {
        scan: tools.scannerLevel, trace: tools.traceLevel, domain: tools.domainLevel, bot: tools.botnetTools
    };
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const timeDisplay = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    const timeColor = timeLeft < 60 ? 'text-red-500' : 'text-cyan-400';
    
    return (
        <div className="min-h-screen p-2 sm:p-3 bg-slate-900 text-slate-300">
             <header className="flex items-center mb-3">
                <button onClick={onBack} className="text-2xl font-bold text-slate-300 hover:text-white transition-colors">&lt;</button>
                <h1 className="text-2xl md:text-3xl font-bold text-white ml-2">White-Hat</h1>
            </header>
            
            <div className="flex justify-between items-center text-sm font-semibold text-slate-300 bg-slate-800 p-2 rounded-lg border border-slate-700 mb-3">
                <div className="flex gap-x-4">
                  <div>Reputation: <span className="font-bold text-cyan-400">{rep}</span></div>
                  <div>Time Left: <span className={`font-bold ${timeColor}`}>{timeDisplay}</span></div>
                </div>
                <div className="truncate text-slate-400 text-xs sm:text-sm">Tools: 
                    <span className="font-normal ml-2">
                        Scanner L{tools.scannerLevel} | Trace L{tools.traceLevel} | Domain L{tools.domainLevel} | Botkit L{tools.botnetTools}
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 mt-3">
                {/* Left Panel */}
                <aside className="lg:col-span-3 space-y-3">
                    <div className="bg-slate-800 border border-slate-700 rounded-lg p-3">
                        <h3 className="font-bold mb-2 text-slate-100">
                           {currentCase ? `Objectives` : "Select a Case"}
                        </h3>
                        {currentCase ? (
                             <ul className="text-sm space-y-2">
                                {currentCase.objectives.map((obj, i) => {
                                    const details = objectiveDescriptions[obj.type];
                                    return (
                                        <li key={i} className={`flex items-start ${obj._done ? 'text-slate-500 opacity-60' : ''}`}>
                                            <div className="flex-shrink-0 pt-1">
                                                {obj._done ? <CheckCircleIcon className="h-5 w-5 text-green-500" /> : <div className="h-5 w-5 border-2 border-slate-600 rounded-full" />}
                                            </div>
                                            <div className="ml-2">
                                                <p className={`font-bold ${obj._done ? 'line-through' : 'text-slate-200'}`}>{details.title}</p>
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>
                        ) : <p className="text-sm text-slate-400">Objectives will appear here.</p>}
                    </div>
                     <div className="bg-slate-800 border border-slate-700 rounded-lg p-3">
                        <h3 className="font-bold mb-2 text-slate-100">Upgrade Shop</h3>
                        <div className="space-y-2">
                           {SHOP_ITEMS.map(item => (
                               <button key={item.id} onClick={() => handleBuy(item)} disabled={rep < item.cost}
                                   className="w-full text-left p-2 bg-slate-900/70 rounded-md hover:bg-slate-700 disabled:bg-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed transition-colors border border-slate-700">
                                   <div className="flex justify-between items-center">
                                       <span className="font-semibold text-sm text-slate-200">{item.name} <span className="text-slate-400">(L{toolLevelMap[item.id] || 1})</span></span>
                                       <span className={`font-bold text-xs ${rep < item.cost ? 'text-slate-500' : 'text-cyan-400'}`}>{item.cost} Rep</span>
                                   </div>
                                   <p className="text-xs text-slate-400 mt-1">{item.desc}</p>
                               </button>
                           ))}
                        </div>
                    </div>
                </aside>

                {/* Center Panel */}
                <main className="lg:col-span-6 flex flex-col">
                    <div className="bg-slate-800 border border-slate-700 rounded-lg p-3 flex-grow flex items-center justify-center">
                        {stageContent}
                    </div>
                    <div className="mt-3">
                        <h3 className="font-bold text-sm text-center text-slate-400 mb-1">Investigation Log</h3>
                        <LogPanel logs={logs} />
                    </div>
                </main>

                {/* Right Panel */}
                <aside className="lg:col-span-3 space-y-3">
                     <div className="bg-slate-800 border border-slate-700 rounded-lg p-3">
                        <h3 className="font-bold mb-2 text-slate-100">Case Inbox</h3>
                        <div className="space-y-2 max-h-[150px] overflow-y-auto pr-1">
                            {websiteCases.map((caseItem) => {
                                const msg = MESSAGES[caseItem.id];
                                const isComplete = caseItem._isComplete;
                                return (
                                <button key={caseItem.id} onClick={() => selectCase(caseItem.id)} 
                                className={`w-full text-left p-2 rounded-md text-xs transition-all border ${isComplete ? 'bg-slate-800 opacity-50 border-transparent' : selectedCaseId === caseItem.id ? 'bg-cyan-900/50 border-cyan-500' : 'bg-slate-900/70 hover:bg-slate-700 border-slate-700'}`}>
                                    <div className="flex justify-between items-start">
                                        <p className="font-bold text-slate-200 truncate pr-2">{msg.from}</p>
                                        {isComplete && <CheckCircleIcon className="h-4 w-4 text-green-500 flex-shrink-0" />}
                                    </div>
                                    <p className="text-slate-300 mt-1">{msg.subject}</p>
                                </button>
                                );
                            })}
                        </div>
                    </div>
                    <div className="bg-slate-800 border border-slate-700 rounded-lg p-3">
                        <h3 className="font-bold mb-2 text-slate-100">Intel & Tools</h3>
                        <div className="grid grid-cols-2 gap-2">
                             <button onClick={() => startTool('analyze')} disabled={!isObjectiveAvailable('analyze')} className="p-2 bg-slate-900/70 border border-slate-700 rounded-md hover:bg-slate-700 text-sm disabled:bg-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed">Analyze Msg</button>
                             <button onClick={() => startTool('trace')} disabled={!isObjectiveAvailable('trace')} className="p-2 bg-slate-900/70 border border-slate-700 rounded-md hover:bg-slate-700 text-sm disabled:bg-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed">Trace Route</button>
                             <button onClick={() => startTool('domain')} disabled={!isObjectiveAvailable('domain')} className="p-2 bg-slate-900/70 border border-slate-700 rounded-md hover:bg-slate-700 text-sm disabled:bg-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed">Domain Intel</button>
                             <button onClick={() => startTool('app')} disabled={!isObjectiveAvailable('app')} className="p-2 bg-slate-900/70 border border-slate-700 rounded-md hover:bg-slate-700 text-sm disabled:bg-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed">Inspect App</button>
                             <button onClick={() => startTool('botnet')} disabled={!isObjectiveAvailable('botnet')} className="p-2 bg-slate-900/70 border border-slate-700 rounded-md hover:bg-slate-700 text-sm disabled:bg-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed">Botnet Takedown</button>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
};