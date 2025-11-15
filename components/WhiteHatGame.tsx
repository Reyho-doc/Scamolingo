import React, { useState, useEffect, useCallback } from 'react';
import { MISSIONS, MESSAGES, SHOP_ITEMS, APP_POOL, Mission, Message, ShopItem, GameTools, MissionObjective, AppProfile } from '../data/whiteHatGameData';

interface WhiteHatGameProps {
  onBack: () => void;
  onWin: () => void;
}

// --- Helper Components & Icons ---

const CheckCircleIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.06-1.06L10.939 12.88l-1.854-1.853a.75.75 0 0 0-1.06 1.06l2.5 2.5a.75.75 0 0 0 1.06 0l4.25-4.25Z" clipRule="evenodd" />
    </svg>
);

const LogPanel: React.FC<{ logs: string[] }> = ({ logs }) => (
    <div className="bg-slate-900/50 p-2 rounded-md h-40 overflow-y-auto flex flex-col-reverse">
        <div className="flex flex-col-reverse">
            {logs.map((log, i) => <div key={i} className="text-xs text-slate-400 p-1">{log}</div>)}
        </div>
    </div>
);

const Hud: React.FC<{ missionTitle: string; timer: number; rep: number; tools: GameTools }> = ({ missionTitle, timer, rep, tools }) => {
    const formatTime = (sec: number) => {
        const m = Math.floor(sec / 60);
        const s = sec % 60;
        return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
    };
    return (
        <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm font-semibold text-slate-300 bg-slate-800/50 p-3 rounded-lg border border-slate-700">
            <div>Mission: <span className="font-bold text-white">{missionTitle}</span></div>
            <div>Time: <span className="font-bold text-red-400">{formatTime(timer)}</span></div>
            <div>Reputation: <span className="font-bold text-cyan-400">{rep}</span></div>
            <div className="truncate">Tools: <span className="font-normal text-slate-400 text-xs">
                Scanner L{tools.scannerLevel} | Trace L{tools.traceLevel} | Domain L{tools.domainLevel} | Botkit L{tools.botnetTools}
            </span></div>
        </div>
    );
};


// --- Minigame Components ---

type MiniGameProps = {
    tools: GameTools;
    log: (message: string) => void;
    setRep: React.Dispatch<React.SetStateAction<number>>;
    onComplete: () => void;
};

// Analyze Message Minigame
const AnalyzeMessageGame: React.FC<MiniGameProps & { message: Message }> = ({ message, tools, log, setRep, onComplete }) => {
    const handleSelection = async (option: string) => {
        const delay = Math.max(400, 1400 - (tools.scannerLevel * 200));
        log("Analyzing message...");
        await new Promise(res => setTimeout(res, delay));

        if (option === message.correct) {
            const repGain = 10 + tools.scannerLevel * 2;
            setRep(r => r + repGain);
            log(`Analysis correct! +${repGain} Rep. ${message.teach}`);
            onComplete();
        } else {
            const incorrectInfo = message.incorrectFeedback.find(fb => fb.option === option);
            const feedback = incorrectInfo ? incorrectInfo.feedback : "That was not the correct classification for this type of threat.";
            log(`Analysis incorrect. ${feedback} The correct answer was: ${message.correct}.`);
            onComplete();
        }
    };

    const opts = ["Mobile Phishing (Smishing)", "Repackaging / Phishing", "Rogue Keyboard", "Man-in-the-Middle"];
    return (
        <div>
            <h3 className="text-lg font-bold text-center mb-4">Analyze Message</h3>
            <div className="text-sm p-3 bg-slate-900/50 rounded-md">
                <p><strong>From:</strong> {message.from}</p>
                <p><strong>Subject:</strong> {message.subject}</p>
            </div>
            <p className="text-center my-3">What type of scam is this?</p>
            <div className="grid grid-cols-2 gap-2">
                {opts.map(o => <button key={o} onClick={() => handleSelection(o)} className="p-2 bg-slate-700 rounded-md hover:bg-cyan-600">{o}</button>)}
            </div>
        </div>
    );
};

// Domain Detective Minigame
const DomainDetectiveGame: React.FC<MiniGameProps> = ({ tools, log, setRep, onComplete }) => {
    const [domainInput, setDomainInput] = useState('');
    const [analysisResult, setAnalysisResult] = useState<React.ReactNode>(null);

    const analyzeDomain = async () => {
        const domain = domainInput.trim();
        if (!domain) return;
        setAnalysisResult(<p>Analyzing...</p>);
        await new Promise(res => setTimeout(res, 600 - tools.domainLevel * 80));

        const patterns: string[] = [];
        if (/[0-9]/.test(domain)) patterns.push("Contains digits (potential typosquatting).");
        if ((domain.match(/-/g) || []).length > 1) patterns.push("Multiple hyphens (suspicious).");
        if (domain.includes('xn--')) patterns.push("Punycode detected (potential homograph attack).");

        const score = Math.min(95, (patterns.length * 25) + (10 * (3 - tools.domainLevel)));
        
        if (score > 50) {
            const repGain = 6 + tools.domainLevel;
            setRep(r => r + repGain);
            log(`Domain ${domain} is suspicious (${score}%). +${repGain} Rep.`);
            setAnalysisResult(
                <div>
                    <p className="font-bold text-red-400">Risk Score: {score}% - Likely Malicious</p>
                    <ul className="list-disc list-inside text-sm mt-2">{patterns.map(p => <li key={p}>{p}</li>)}</ul>
                </div>
            );
            onComplete();
        } else {
            log(`Domain ${domain} has low suspicion (${score}%).`);
            setAnalysisResult(<p className="font-bold text-green-400">Risk Score: {score}% - Likely Safe</p>);
            onComplete();
        }
    };

    return (
        <div className="text-center w-full">
            <h3 className="font-bold text-lg mb-2">Domain Detective</h3>
            <p className="text-sm text-slate-400 mb-4">Type the suspicious domain to analyze for typosquatting or malicious traits.</p>
            <div className="flex gap-2">
                <input 
                    value={domainInput} 
                    onChange={e => setDomainInput(e.target.value)} 
                    className="w-full bg-slate-900 p-2 rounded-md border border-slate-600 focus:ring-cyan-500 focus:border-cyan-500 text-white" 
                    placeholder="e.g., paypa1.com" 
                />
                <button 
                    onClick={analyzeDomain} 
                    className="p-2 px-4 bg-cyan-600 rounded-md hover:bg-cyan-700 font-semibold"
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

    const handleChoice = (isMarkedMalicious: boolean) => {
        if (isMarkedMalicious === app.isMalicious) {
            const repGain = app.isMalicious ? 10 : 6;
            setRep(r => r + repGain);
            log(`Correct! App analysis successful. +${repGain} Rep.`);
        } else {
            log("Incorrect app assessment.");
        }
        onComplete();
    };

    return (
        <div>
            <h3 className="text-lg font-bold text-center mb-2">App Inspector</h3>
            <p className="text-center text-sm text-slate-400">Inspect app: <strong>{app.name}</strong></p>
            <ul className="text-xs list-disc list-inside bg-slate-900/50 p-2 my-2 rounded-md">
                {app.signature.map(sig => <li key={sig}>{sig}</li>)}
            </ul>
            <div className="flex justify-center gap-2 mt-4">
                <button onClick={() => handleChoice(false)} className="p-2 bg-green-600 rounded-md hover:bg-green-700">Mark Safe</button>
                <button onClick={() => handleChoice(true)} className="p-2 bg-red-600 rounded-md hover:bg-red-700">Mark Malicious</button>
            </div>
        </div>
    );
};

// Botnet Takedown Minigame
const BotnetTakedownGame: React.FC<MiniGameProps> = ({ tools, log, setRep, onComplete }) => {
    const [bots, setBots] = useState(() => Array.from({ length: 8 + tools.botnetTools * 2 }, () => true));
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
        if(aliveCount === 0) {
             const repGain = 15 + tools.botnetTools * 2;
             setRep(r => r + repGain);
             log(`Botnet neutralized! +${repGain} Rep.`);
             onComplete();
        }
    }, [aliveCount, tools.botnetTools, log, setRep, onComplete]);

    return (
        <div className="text-center">
            <h3 className="font-bold text-lg mb-2">Botnet Shutdown</h3>
            <p className="text-sm text-slate-400 mb-4">Bots Alive: {aliveCount}</p>
            <div className="grid grid-cols-5 gap-2">
                {bots.map((isAlive, i) => (
                    <button key={i} onClick={() => handleBotClick(i)} disabled={!isAlive}
                        className={`h-12 w-12 rounded-md text-xs font-bold ${isAlive ? 'bg-red-500 animate-pulse' : 'bg-slate-600 opacity-50'}`}>
                        BOT
                    </button>
                ))}
            </div>
        </div>
    );
};

// NEW: Packet Path Maze Minigame
const PacketPathMazeGame: React.FC<MiniGameProps> = ({ tools, log, setRep, onComplete }) => {
    type NodeType = 'START' | 'END' | 'VALID' | 'SPOOFED' | 'PROXY' | 'DEAD_END';
    type MazeNode = { type: NodeType; row: number; col: number };
    type PathCoord = { row: number; col: number };

    const [maze, setMaze] = useState<MazeNode[][]>([]);
    const [path, setPath] = useState<PathCoord[]>([]);
    
    const generateMaze = useCallback((level: number) => {
        const size = 5 + Math.min(level -1, 3);
        const newMaze: MazeNode[][] = Array.from({ length: size }, (_, row) =>
            Array.from({ length: size }, (_, col) => ({ type: 'DEAD_END', row, col }))
        );

        // Place Start and End
        newMaze[0][0].type = 'START';
        newMaze[size - 1][size - 1].type = 'END';
        setPath([{ row: 0, col: 0 }]);

        // Create a guaranteed path
        const dirs = [[0, 1], [1, 0], [0, -1], [-1, 0]];
        const q: PathCoord[] = [{ row: 0, col: 0 }];
        const parent: Map<string, PathCoord | null> = new Map();
        parent.set("0,0", null);

        let endNode: PathCoord | null = null;
        while(q.length > 0) {
            const curr = q.shift()!;
            if (curr.row === size - 1 && curr.col === size - 1) {
                endNode = curr;
                break;
            }
            dirs.sort(() => Math.random() - 0.5);
            for (const [dr, dc] of dirs) {
                const nr = curr.row + dr, nc = curr.col + dc;
                if (nr >= 0 && nr < size && nc >= 0 && nc < size && !parent.has(`${nr},${nc}`)) {
                    parent.set(`${nr},${nc}`, curr);
                    q.push({ row: nr, col: nc });
                }
            }
        }
        
        let curr = endNode;
        while(curr) {
            if (newMaze[curr.row][curr.col].type === 'DEAD_END') newMaze[curr.row][curr.col].type = 'VALID';
            curr = parent.get(`${curr.row},${curr.col}`)!;
        }

        // Fill remaining nodes
        for (let r = 0; r < size; r++) {
            for (let c = 0; c < size; c++) {
                if (newMaze[r][c].type === 'DEAD_END') {
                    const rand = Math.random();
                    if (rand < 0.25) newMaze[r][c].type = 'SPOOFED';
                    else if (rand < 0.5) newMaze[r][c].type = 'PROXY';
                    else if (rand < 0.7) newMaze[r][c].type = 'VALID';
                    // else remains DEAD_END
                }
            }
        }
        setMaze(newMaze);
    }, []);

    useEffect(() => {
        generateMaze(tools.traceLevel);
    }, [tools.traceLevel, generateMaze]);

    const handleNodeClick = (node: MazeNode) => {
        const lastNode = path[path.length - 1];
        if (Math.abs(node.row - lastNode.row) + Math.abs(node.col - lastNode.col) !== 1) {
            return; // Not adjacent
        }

        switch (node.type) {
            case 'SPOOFED':
                log("Path corrupted by spoofed router! Resetting trace.");
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
                const repGain = 8 + tools.traceLevel * 2;
                setRep(r => r + repGain);
                log(`Trace successful! Origin located. +${repGain} Rep.`);
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
            <p className="text-sm text-slate-400 mb-4">Click adjacent nodes to trace the packet from 🟩 START to 🟪 END.</p>
            <div className={`grid gap-1`} style={{gridTemplateColumns: `repeat(${maze.length}, minmax(0, 1fr))`}}>
                {maze.flat().map((node, i) => {
                    const inPath = path.some(p => p.row === node.row && p.col === node.col);
                    return (
                        <button key={i} onClick={() => handleNodeClick(node)}
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
export const WhiteHatGame: React.FC<WhiteHatGameProps> = ({ onBack, onWin }) => {
    // Game State
    const [rep, setRep] = useState(0);
    const [tools, setTools] = useState<GameTools>({ scannerLevel: 1, traceLevel: 1, domainLevel: 1, botnetTools: 1 });
    const [missions, setMissions] = useState<Mission[]>(JSON.parse(JSON.stringify(MISSIONS))); // Deep copy
    const [activeMissionIndex, setActiveMissionIndex] = useState(0);
    const [timer, setTimer] = useState(0);
    const [logs, setLogs] = useState<string[]>([]);
    const [selectedMessage, setSelectedMessage] = useState<number | null>(null);
    const [stageContent, setStageContent] = useState<React.ReactNode>(null);
    const [gameState, setGameState] = useState<'intro' | 'playing' | 'mission_failed' | 'all_complete' | 'tutorial'>('intro');
    const [tutorialStep, setTutorialStep] = useState(0);

    const objectiveDescriptions: Record<string, { title: string, description: string }> = {
        analyze: { title: "Analyze Message", description: "Classify a scam from the inbox." },
        trace: { title: "Trace Route", description: "Find the origin server of an attack." },
        domain: { title: "Domain Intel", description: "Analyze a suspicious URL for threats." },
        app: { title: "Inspect App", description: "Check a mobile app for malware." },
        botnet: { title: "Botnet Takedown", description: "Neutralize a network of infected devices." },
    };

    const log = useCallback((message: string) => {
        const time = new Date().toLocaleTimeString();
        setLogs(prev => [`[${time}] ${message}`, ...prev].slice(0, 50));
    }, []);

    const startMission = useCallback((index: number) => {
        if (index >= missions.length) {
            setGameState('all_complete');
            return;
        }
        const mission = missions[index];
        setActiveMissionIndex(index);
        
        const newMissions = [...missions];
        newMissions[index].objectives.forEach(obj => obj._done = false);
        setMissions(newMissions);

        setTimer(300 + index * 60);
        setStageContent(
            <div className="text-center">
                <h3 className="text-xl font-bold text-cyan-300">Mission: {mission.title}</h3>
                <p className="text-slate-400 mt-2">Select a message from the inbox to begin analysis, or choose a tool to start an operation.</p>
            </div>
        );
        log(`Starting mission: "${mission.title}"`);
        setGameState('playing');
    }, [missions, log]);

    useEffect(() => {
        if (gameState !== 'playing' || timer <= 0) return;
        const interval = setInterval(() => setTimer(t => t - 1), 1000);
        return () => clearInterval(interval);
    }, [gameState, timer]);

    useEffect(() => {
        if (timer <= 0 && gameState === 'playing') {
            log("Mission failed: Time expired.");
            setGameState('mission_failed');
        }
    }, [timer, gameState, log]);

    const checkMissionCompletion = useCallback(() => {
        const mission = missions[activeMissionIndex];
        const allDone = mission.objectives.every(o => o._done);
        if (allDone) {
            log(`Mission "${mission.title}" complete! +${mission.reward} Reputation.`);
            setRep(r => r + mission.reward);
            const nextMissionIndex = activeMissionIndex + 1;
            if (nextMissionIndex >= missions.length) {
                onWin();
                setGameState('all_complete');
            } else {
                startMission(nextMissionIndex);
            }
        }
    }, [missions, activeMissionIndex, log, startMission, onWin]);

    const markObjectiveDone = useCallback((type: MissionObjective['type']) => {
        setMissions(currentMissions => {
            const newMissions = [...currentMissions];
            const mission = newMissions[activeMissionIndex];
            const objectiveIndex = mission.objectives.findIndex(o => o.type === type && !o._done);
            if (objectiveIndex !== -1) {
                mission.objectives[objectiveIndex]._done = true;
                log(`Objective complete: ${objectiveDescriptions[type].title}`);
                setTimeout(checkMissionCompletion, 100);
            }
            return newMissions;
        });
    }, [activeMissionIndex, log, checkMissionCompletion, objectiveDescriptions]);
    
    const handleBuy = (item: ShopItem) => {
        if (rep >= item.cost) {
            setRep(r => r - item.cost);
            setTools(t => item.apply(t));
            log(`Purchased ${item.name}.`);
        } else {
            log("Not enough Reputation.");
        }
    };
    
    const startAnalyze = () => {
        if (selectedMessage === null) {
            log("Select a message from the inbox first.");
            return;
        }
        const onComplete = () => markObjectiveDone("analyze");
        setStageContent(<AnalyzeMessageGame message={MESSAGES[selectedMessage]} tools={tools} log={log} setRep={setRep} onComplete={onComplete} />);
    };

    const startTrace = () => {
        const onComplete = () => markObjectiveDone("trace");
        setStageContent(<PacketPathMazeGame tools={tools} log={log} setRep={setRep} onComplete={onComplete} />);
    };
    
    const startDomain = () => {
        const onComplete = () => markObjectiveDone("domain");
        setStageContent(<DomainDetectiveGame tools={tools} log={log} setRep={setRep} onComplete={onComplete} />);
    };

    const startAppInspect = () => {
        const onComplete = () => markObjectiveDone("app");
        setStageContent(<AppInspectorGame tools={tools} log={log} setRep={setRep} onComplete={onComplete} />);
    };

    const startBotnet = () => {
        const onComplete = () => markObjectiveDone("botnet");
        setStageContent(<BotnetTakedownGame tools={tools} log={log} setRep={setRep} onComplete={onComplete} />);
    };
    
    // --- Render Logic ---
    if (gameState === 'intro') {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
                <h1 className="text-3xl font-bold text-cyan-400">White-Hat: Stop the Scam Network</h1>
                <p className="text-slate-300 max-w-xl my-4">You are a cybersecurity researcher. Your mission is to analyze scams, trace their infrastructure, and shut down their operations. Complete missions to earn Reputation and upgrade your tools.</p>
                <div className="flex gap-4">
                    <button onClick={() => startMission(0)} className="text-xl font-bold bg-cyan-600 py-3 px-8 rounded-md hover:bg-cyan-700">Start First Mission</button>
                    <button onClick={() => setGameState('tutorial')} className="text-lg font-bold bg-slate-600 py-3 px-6 rounded-md hover:bg-slate-700">How to Play</button>
                </div>
            </div>
        );
    }
    
    if (gameState === 'tutorial') {
        const tutorialData = [
            { title: "Welcome to White-Hat!", text: "This is a simulation where you play as a cybersecurity researcher. Let's go over the interface." },
            { title: "The HUD", text: "At the top, you'll see your current Mission, the Time remaining, your Reputation (Rep), and your Tool levels." },
            { title: "Objectives & Shop", text: "On the left are your Mission Objectives and the Upgrade Shop. Use Rep earned from completing objectives to upgrade your tools." },
            { title: "Stage & Log", text: "The center area is your main workspace (Stage), where mini-games appear. Below it is the Investigation Log, which records all your actions." },
            { title: "Inbox & Tools", text: "On the right is your Scam Inbox containing suspicious messages, and your Tools panel. Start by selecting a message and clicking 'Analyze Msg'." },
            { title: "Ready to Go!", text: "That's everything you need to know. Good luck, agent!" }
        ];
        return (
            <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
                 <div className="bg-slate-800 p-8 rounded-lg max-w-lg">
                    <h2 className="text-2xl font-bold text-cyan-400 mb-4">{tutorialData[tutorialStep].title}</h2>
                    <p className="text-slate-300 mb-6">{tutorialData[tutorialStep].text}</p>
                    {tutorialStep < tutorialData.length - 1 ? (
                         <button onClick={() => setTutorialStep(s => s + 1)} className="text-lg font-bold bg-cyan-600 py-2 px-6 rounded-md hover:bg-cyan-700">Next</button>
                    ) : (
                         <button onClick={() => setGameState('intro')} className="text-lg font-bold bg-green-600 py-2 px-6 rounded-md hover:bg-green-700">Finish Tutorial</button>
                    )}
                 </div>
            </div>
        );
    }

    if (gameState === 'all_complete') {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
                <h1 className="text-3xl font-bold text-green-400">🎉 VICTORY! 🎉</h1>
                <p className="text-slate-300 max-w-xl my-4">You have successfully disrupted all major scam networks. Your skills have made the digital world a safer place. Great work, white-hat!</p>
                <button onClick={onBack} className="text-xl font-bold bg-slate-600 py-3 px-8 rounded-md hover:bg-slate-700">Return to Games</button>
            </div>
        );
    }
    
    if (gameState === 'mission_failed') {
         return (
            <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
                <h1 className="text-3xl font-bold text-red-500">Mission Failed</h1>
                <p className="text-slate-300 max-w-xl my-4">You ran out of time. The scam network continued its operations. Regroup and try again.</p>
                <button onClick={() => startMission(activeMissionIndex)} className="text-xl font-bold bg-red-600 py-3 px-8 rounded-md hover:bg-red-700">Retry Mission</button>
            </div>
        );
    }

    const currentMission = missions[activeMissionIndex];
    const toolLevelMap: Record<string, number> = {
        scan: tools.scannerLevel,
        trace: tools.traceLevel,
        domain: tools.domainLevel,
        bot: tools.botnetTools
    };
    
    return (
        <div className="min-h-screen p-2 sm:p-4">
             <header className="flex items-center mb-4">
                <button onClick={onBack} className="mr-4 p-2 rounded-full hover:bg-slate-700 transition-colors" aria-label="Go back">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                </button>
                <h1 className="text-2xl md:text-3xl font-bold text-white">White-Hat</h1>
            </header>
            <Hud missionTitle={currentMission.title} timer={timer} rep={rep} tools={tools} />

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mt-4">
                {/* Left Panel */}
                <aside className="lg:col-span-1 space-y-4">
                    <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-3">
                        <h3 className="font-bold mb-2 text-slate-100">Active Objectives</h3>
                        <ul className="text-sm space-y-3">
                            {currentMission.objectives.map((obj, i) => {
                                const details = objectiveDescriptions[obj.type];
                                return (
                                    <li key={i} className={`flex items-start ${obj._done ? 'text-slate-500 opacity-60' : ''}`}>
                                        <div className="flex-shrink-0 pt-1">
                                            {obj._done ? <CheckCircleIcon className="h-5 w-5 text-green-500" /> : <div className="h-5 w-5 border-2 border-slate-600 rounded-full" />}
                                        </div>
                                        <div className="ml-2">
                                            <p className={`font-bold ${obj._done ? 'line-through' : 'text-slate-200'}`}>{details.title}</p>
                                            <p className="text-xs text-slate-400">{details.description}</p>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                     <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-3">
                        <h3 className="font-bold mb-2 text-slate-100">Upgrade Shop</h3>
                        <div className="space-y-2">
                           {SHOP_ITEMS.map(item => (
                               <button key={item.id} onClick={() => handleBuy(item)} disabled={rep < item.cost}
                                   className="w-full text-left p-2 bg-slate-700 rounded-md hover:bg-cyan-600 disabled:bg-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed transition-colors">
                                   <div className="flex justify-between items-center">
                                       <span className="font-semibold text-sm">{item.name} (L{toolLevelMap[item.id] || 1})</span>
                                       <span className={`font-bold text-xs ${rep < item.cost ? 'text-slate-500' : 'text-cyan-400'}`}>{item.cost} Rep</span>
                                   </div>
                                   <p className="text-sm text-slate-300 mt-1">{item.desc}</p>
                               </button>
                           ))}
                        </div>
                    </div>
                </aside>

                {/* Center Panel */}
                <main className="lg:col-span-2 space-y-4">
                    <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 min-h-[300px] flex items-center justify-center">
                        {stageContent}
                    </div>
                    <div>
                        <h3 className="font-bold mb-2 text-sm">Investigation Log</h3>
                        <LogPanel logs={logs} />
                    </div>
                </main>

                {/* Right Panel */}
                <aside className="lg:col-span-1 space-y-4">
                     <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-3">
                        <h3 className="font-bold mb-2">Scam Inbox</h3>
                        <div className="space-y-2 max-h-60 overflow-y-auto">
                            {MESSAGES.map((msg, i) => (
                                <button key={i} onClick={() => setSelectedMessage(i)} 
                                className={`w-full text-left p-2 rounded-md text-xs transition-all ${selectedMessage === i ? 'bg-cyan-800 ring-2 ring-cyan-400' : 'bg-slate-700 hover:bg-slate-600'}`}>
                                    <p className="font-bold truncate">{msg.from}</p>
                                    <p className="text-slate-300 truncate">{msg.subject}</p>
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-3">
                        <h3 className="font-bold mb-2">Intel & Tools</h3>
                        <div className="grid grid-cols-2 gap-2">
                             <button onClick={startAnalyze} className="p-2 bg-slate-700 rounded-md hover:bg-cyan-600 text-sm">Analyze Msg</button>
                             <button onClick={startTrace} className="p-2 bg-slate-700 rounded-md hover:bg-cyan-600 text-sm">Trace Route</button>
                             <button onClick={startDomain} className="p-2 bg-slate-700 rounded-md hover:bg-cyan-600 text-sm">Domain Intel</button>
                             <button onClick={startAppInspect} className="p-2 bg-slate-700 rounded-md hover:bg-cyan-600 text-sm">Inspect App</button>
                             <button onClick={startBotnet} className="p-2 bg-slate-700 rounded-md hover:bg-cyan-600 text-sm">Botnet Takedown</button>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
};