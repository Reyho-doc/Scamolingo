import React from 'react';
import { Page } from '../types';

interface GamesPageProps {
  onBack: () => void;
  navigateTo: (page: Page) => void;
}

const ThinkingFaceIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
    </svg>
);

const ShieldIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z" clipRule="evenodd" />
    </svg>
);

const BrainIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2a2.5 2.5 0 0 0-2.5 2.5c0 .19.03.38.07.56A6.002 6.002 0 0 0 5.5 11c0 2.05.51 3.93 1.34 5.5C4.84 17.5 4 19.13 4 21c0 .55.45 1 1 1h14c.55 0 1-.45 1-1 0-1.87-.84-3.5-2.84-4.5A6.002 6.002 0 0 0 18.5 11c0-2.75-1.8-5.02-4.07-5.94.04-.18.07-.37.07-.56A2.5 2.5 0 0 0 12 2zm-1 14.5c-1 .6-2.5 1.5-2.5 2.5h2v2h-2c0-1.5-1-2.43-1-3.5 0-1.3.73-2.44 1.69-3.13.96-.68 2.31-1.37 2.31-2.87 0-1.9-1.2-3.5-3-3.5-.83 0-1.5.67-1.5 1.5S7.67 11 8.5 11c.83 0 1.5-.67 1.5-1.5S9.17 8 8.5 8c-1.93 0-3.5 1.57-3.5 3.5 0 .85.31 1.62.82 2.24C5.31 14.38 5 15.15 5 16v1h2v-1c0-1.1.9-2 2-2 1.3 0 2.4.84 2.82 2H10v2h2v-2h-.82c.42-1.16 1.52-2 2.82-2 1.1 0 2 .9 2 2v1h2v-1c0-.85-.31-1.62-.82-2.24.51-.62.82-1.39.82-2.24 0-1.93-1.57-3.5-3.5-3.5-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8c-1.8 0-3 1.6-3 3.5 0 1.5 1.35 2.19 2.31 2.87.96.69 1.69 1.83 1.69 3.13 0 1.07-1 2-1 3.5h-2v-2h2c0-1-1.5-1.9-2.5-2.5z"/>
  </svg>
);

const TerminalIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M2.25 6A3.75 3.75 0 0 1 6 2.25h12A3.75 3.75 0 0 1 21.75 6v12A3.75 3.75 0 0 1 18 21.75H6A3.75 3.75 0 0 1 2.25 18V6ZM6 4.5A1.5 1.5 0 0 0 4.5 6v12A1.5 1.5 0 0 0 6 19.5h12A1.5 1.5 0 0 0 19.5 18V6A1.5 1.5 0 0 0 18 4.5H6ZM7.5 9.75a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3Zm-1.5 3.75a.75.75 0 0 1 .75-.75h6a.75.75 0 0 1 0 1.5h-6a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
    </svg>
);


export const GamesPage: React.FC<GamesPageProps> = ({ onBack, navigateTo }) => {
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
            <h1 className="text-3xl md:text-4xl font-bold text-white">Scamolingo Games</h1>
        </header>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            <button
                onClick={() => navigateTo(Page.IsThisAScamGame)}
                className="relative group p-8 bg-slate-800/50 rounded-lg border border-slate-700 hover:border-cyan-400 hover:bg-slate-800 transition-all duration-300 text-center flex flex-col items-center"
            >
                <div className="absolute top-3 right-3 bg-cyan-500/20 text-cyan-300 text-xs font-bold uppercase px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Beginner
                </div>
                <ThinkingFaceIcon className="h-16 w-16 mx-auto text-slate-400 group-hover:text-cyan-400 transition-colors" />
                <h2 className="text-2xl font-semibold text-white mt-4">Is this a scam?</h2>
                <p className="text-slate-400 mt-2">Read real-world scenarios and decide if they're a scam or legitimate.</p>
            </button>

            <button
                onClick={() => navigateTo(Page.PreventTheScamGame)}
                className="relative group p-8 bg-slate-800/50 rounded-lg border border-slate-700 hover:border-fuchsia-400 hover:bg-slate-800 transition-all duration-300 text-center flex flex-col items-center"
            >
                <div className="absolute top-3 right-3 bg-fuchsia-500/20 text-fuchsia-300 text-xs font-bold uppercase px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Intermediate
                </div>
                <ShieldIcon className="h-16 w-16 mx-auto text-slate-400 group-hover:text-fuchsia-400 transition-colors" />
                <h2 className="text-2xl font-semibold text-white mt-4">Prevent the scam</h2>
                <p className="text-slate-400 mt-2">A strategic game where you complete security tasks to block incoming scams.</p>
            </button>

            <button
                onClick={() => navigateTo(Page.KnowYourScams)}
                className="relative group p-8 bg-slate-800/50 rounded-lg border border-slate-700 hover:border-amber-400 hover:bg-slate-800 transition-all duration-300 text-center flex flex-col items-center"
            >
                <div className="absolute top-3 right-3 bg-amber-500/20 text-amber-300 text-xs font-bold uppercase px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Hard
                </div>
                <BrainIcon className="h-16 w-16 mx-auto text-slate-400 group-hover:text-amber-400 transition-colors" />
                <h2 className="text-2xl font-semibold text-white mt-4">Know Your Scams</h2>
                <p className="text-slate-400 mt-2">Identify specific, technical scam types in a multiple-choice quiz.</p>
            </button>

             <button
                onClick={() => navigateTo(Page.WhiteHatGame)}
                className="relative group p-8 bg-slate-800/50 rounded-lg border border-slate-700 hover:border-red-400 hover:bg-slate-800 transition-all duration-300 text-center flex flex-col items-center"
            >
                <div className="absolute top-3 right-3 bg-red-500/20 text-red-300 text-xs font-bold uppercase px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Expert
                </div>
                <TerminalIcon className="h-16 w-16 mx-auto text-slate-400 group-hover:text-red-400 transition-colors" />
                <h2 className="text-2xl font-semibold text-white mt-4">White-Hat</h2>
                <p className="text-slate-400 mt-2">A simulation game where you analyze scams and shut down malicious networks.</p>
            </button>
        </div>
    </div>
  );
};