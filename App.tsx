import React, { useState, useEffect } from 'react';
import { Page } from './types';
import { HomePage } from './components/HomePage';
import { ScamInfoPage } from './components/ScamInfoPage';
import { RealOrScamPage } from './components/RealOrScamPage';
import { ProtectionPage } from './components/ProtectionPage';
import { GamesPage } from './components/GamesPage';
import { IsThisAScamGame } from './components/IsThisAScamGame';
import { HideFromTheScamGame } from './components/HideFromTheScamGame';
import { ScammedHelpPage } from './components/ScammedHelpPage';
import { AchievementsPage } from './components/AchievementsPage';
import { KnowYourScamsGame } from './components/KnowYourScamsGame';
import { WhiteHatGame } from './components/WhiteHatGame';

const TrophyIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v2h10v-2h-4v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.25 5 8zm7 10c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm7-10c0 1.25-.84 2.4-2 2.82V7h2v1z"/>
  </svg>
);


interface Achievements {
  GAMES_MASTER: boolean;
  URL_SCANNER: boolean;
  KNOWLEDGE_SEEKER: boolean;
  SCAMOLINGO_GOAT: boolean;
}

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.Home);
  
  // Game win states
  const [isThisAScamGameWon, setIsThisAScamGameWon] = useState(false);
  const [preventTheScamGameWon, setPreventTheScamGameWon] = useState(false);
  const [knowYourScamsGameWon, setKnowYourScamsGameWon] = useState(false);
  const [whiteHatGameWon, setWhiteHatGameWon] = useState(false);

  // Page visit states for achievements
  const [scamInfoVisited, setScamInfoVisited] = useState(false);
  const [protectionVisited, setProtectionVisited] = useState(false);
  
  // Achievements state
  const [achievements, setAchievements] = useState<Achievements>({
    GAMES_MASTER: false,
    URL_SCANNER: false,
    KNOWLEDGE_SEEKER: false,
    SCAMOLINGO_GOAT: false,
  });

  // Check for "Games Master" achievement
  useEffect(() => {
    if (isThisAScamGameWon && preventTheScamGameWon && knowYourScamsGameWon && whiteHatGameWon) {
      setAchievements(prev => ({ ...prev, GAMES_MASTER: true }));
    }
  }, [isThisAScamGameWon, preventTheScamGameWon, knowYourScamsGameWon, whiteHatGameWon]);
  
  // Check for "Knowledge Seeker" achievement
  useEffect(() => {
    if (scamInfoVisited && protectionVisited) {
      setAchievements(prev => ({ ...prev, KNOWLEDGE_SEEKER: true }));
    }
  }, [scamInfoVisited, protectionVisited]);

  // Check for "Scamolingo GOAT" achievement
  useEffect(() => {
    if (achievements.GAMES_MASTER && achievements.URL_SCANNER && achievements.KNOWLEDGE_SEEKER) {
      setAchievements(prev => ({ ...prev, SCAMOLINGO_GOAT: true }));
    }
  }, [achievements.GAMES_MASTER, achievements.URL_SCANNER, achievements.KNOWLEDGE_SEEKER]);


  const handleIsThisAScamWin = () => {
    if (!isThisAScamGameWon) setIsThisAScamGameWon(true);
  };
  const handlePreventTheScamWin = () => {
      if (!preventTheScamGameWon) setPreventTheScamGameWon(true);
  };
  const handleKnowYourScamsWin = () => {
    if (!knowYourScamsGameWon) setKnowYourScamsGameWon(true);
  };
  const handleWhiteHatGameWin = () => {
    if (!whiteHatGameWon) setWhiteHatGameWon(true);
  };
  const handleUrlScanned = () => {
      setAchievements(prev => ({ ...prev, URL_SCANNER: true }));
  };

  const navigateTo = (page: Page) => {
    if (page === Page.ScamInfo) setScamInfoVisited(true);
    if (page === Page.Protection) setProtectionVisited(true);
    setCurrentPage(page);
  };

  const renderPage = () => {
    switch (currentPage) {
      case Page.ScamInfo:
        return <ScamInfoPage onBack={() => navigateTo(Page.Home)} />;
      case Page.RealOrScam:
        return <RealOrScamPage onBack={() => navigateTo(Page.Home)} onUrlScanned={handleUrlScanned} />;
      case Page.Protection:
        return <ProtectionPage onBack={() => navigateTo(Page.Home)} />;
      case Page.Games:
        return <GamesPage navigateTo={navigateTo} onBack={() => navigateTo(Page.Home)} />;
      case Page.IsThisAScamGame:
        return <IsThisAScamGame onBack={() => navigateTo(Page.Games)} onWin={handleIsThisAScamWin} />;
      case Page.PreventTheScamGame:
        return <HideFromTheScamGame onBack={() => navigateTo(Page.Games)} onWin={handlePreventTheScamWin} />;
       case Page.KnowYourScams:
        return <KnowYourScamsGame onBack={() => navigateTo(Page.Games)} onWin={handleKnowYourScamsWin} />;
      case Page.WhiteHatGame:
        return <WhiteHatGame onBack={() => navigateTo(Page.Games)} onWin={handleWhiteHatGameWin} />;
      case Page.ScammedHelp:
        return <ScammedHelpPage onBack={() => navigateTo(Page.Home)} />;
      case Page.Achievements:
        return <AchievementsPage onBack={() => navigateTo(Page.Home)} achievements={achievements} />;
      case Page.Home:
      default:
        return <HomePage navigateTo={navigateTo} />;
    }
  };

  const pagesWithHiddenButton = [
    Page.Achievements,
    Page.IsThisAScamGame,
    Page.PreventTheScamGame,
    Page.KnowYourScams,
    Page.WhiteHatGame
  ];

  return (
    <div className="bg-slate-900 text-white min-h-screen font-sans relative">
      {currentPage === Page.Home && (
          <button
            onClick={() => navigateTo(Page.ScammedHelp)}
            className="fixed top-4 right-4 border border-slate-700 text-slate-400 py-2 px-4 rounded-lg hover:bg-slate-800 hover:text-slate-300 transition-colors z-50"
            >
            I have been scammed
          </button>
      )}
      <div className="container mx-auto">
        {renderPage()}
      </div>
      {!pagesWithHiddenButton.includes(currentPage) && (
        <button
          onClick={() => navigateTo(Page.Achievements)}
          className="fixed bottom-4 right-4 p-3 bg-slate-700/50 backdrop-blur-sm rounded-full text-slate-400 hover:bg-slate-600 hover:text-cyan-300 transition-all duration-300 z-50 shadow-lg border border-slate-600"
          aria-label="View Achievements"
          >
          <TrophyIcon className="h-6 w-6" />
        </button>
      )}
    </div>
  );
};

export default App;
