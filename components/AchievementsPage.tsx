import React from 'react';

interface AchievementsPageProps {
  onBack: () => void;
  achievements: {
    GAMES_MASTER: boolean;
    URL_SCANNER: boolean;
    KNOWLEDGE_SEEKER: boolean;
    SCAMOLINGO_GOAT: boolean;
  };
}

const achievementData = [
    {
        id: 'GAMES_MASTER',
        icon: '🎮',
        title: 'Games Master',
        description: 'Win all four games: "Is this a scam?", "Prevent the scam", "Know Your Scams", and "White-Hat".',
    },
    {
        id: 'URL_SCANNER',
        icon: '🔎',
        title: 'URL Scanner',
        description: 'Use the "Analyze URL" feature in the Real or Scam tool for the first time.',
    },
    {
        id: 'KNOWLEDGE_SEEKER',
        icon: '📚',
        title: 'Knowledge Seeker',
        description: 'Read both the "Scam Information" and "Are You Protected?" pages.',
    },
    {
        id: 'SCAMOLINGO_GOAT',
        icon: '🐐',
        title: 'Scamolingo GOAT',
        description: 'Unlock all other achievements to become the Greatest Of All Time.',
    },
];

const CheckCircleIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.06-1.06L10.939 12.88l-1.854-1.853a.75.75 0 0 0-1.06 1.06l2.5 2.5a.75.75 0 0 0 1.06 0l4.25-4.25Z" clipRule="evenodd" />
    </svg>
);


export const AchievementsPage: React.FC<AchievementsPageProps> = ({ onBack, achievements }) => {
  return (
    <div className="min-h-screen p-4 sm:p-6 md:p-8">
      <header className="flex items-center mb-8">
        <button
          onClick={onBack}
          className="mr-4 p-2 rounded-full hover:bg-slate-700 transition-colors"
          aria-label="Go back"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-3xl md:text-4xl font-bold text-white">Achievements</h1>
      </header>
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {achievementData.map((ach) => {
          const isUnlocked = achievements[ach.id as keyof typeof achievements];
          return (
            <div
              key={ach.id}
              className={`bg-slate-800 rounded-lg p-6 border border-slate-700 flex flex-col items-center text-center transition-all duration-300 ${
                !isUnlocked ? 'grayscale opacity-60' : ''
              }`}
            >
              <div className="relative">
                <div className="text-6xl mb-4">{ach.icon}</div>
                {isUnlocked && (
                    <CheckCircleIcon className="h-8 w-8 text-green-400 absolute -top-2 -right-2 bg-slate-800 rounded-full" />
                )}
              </div>
              <h2 className={`text-xl font-semibold mb-2 ${isUnlocked ? 'text-cyan-300' : 'text-slate-400'}`}>{ach.title}</h2>
              <p className="text-slate-400 text-sm flex-grow">{ach.description}</p>
              {!isUnlocked && (
                  <div className="mt-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Locked</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};