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

const BookOpenIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M12 2.25a.75.75 0 0 1 .75.75v9a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM13.5 4.129c0-1.313.924-2.38 2.125-2.38a.75.75 0 0 1 0 1.5c-.398 0-.725.327-.725.73v12.27c0 .403.327.73.725.73a.75.75 0 0 1 0 1.5c-1.201 0-2.125-1.067-2.125-2.38V4.129ZM8.375 3.129c-1.201 0-2.125 1.067-2.125 2.38v12.27c0 1.313 1.067 2.38 2.375 2.38a.75.75 0 0 0 0-1.5c.398 0 .725-.327.725-.73V5.509c0-.403-.327-.73-.725-.73a.75.75 0 0 0 0-1.5Z" clipRule="evenodd" />
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
                onClick={() => navigateTo(Page.WhiteHatGame)}
                className="relative group p-8 bg-slate-800/50 rounded-lg border border-slate-700 hover:border-fuchsia-400 hover:bg-slate-800 transition-all duration-300 text-center flex flex-col items-center"
            >
                <div className="absolute top-3 right-3 bg-fuchsia-500/20 text-fuchsia-300 text-xs font-bold uppercase px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Intermediate
                </div>
                <TerminalIcon className="h-16 w-16 mx-auto text-slate-400 group-hover:text-fuchsia-400 transition-colors" />
                <h2 className="text-2xl font-semibold text-white mt-4">White-Hat</h2>
                <p className="text-slate-400 mt-2">A simulation game where you analyze scams and shut down malicious networks.</p>
            </button>

             <button
                onClick={() => navigateTo(Page.KnowYourScams)}
                className="relative group p-8 bg-slate-800/50 rounded-lg border border-slate-700 hover:border-amber-400 hover:bg-slate-800 transition-all duration-300 text-center flex flex-col items-center"
            >
                <div className="absolute top-3 right-3 bg-amber-500/20 text-amber-300 text-xs font-bold uppercase px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Hard
                </div>
                <BookOpenIcon className="h-16 w-16 mx-auto text-slate-400 group-hover:text-amber-400 transition-colors" />
                <h2 className="text-2xl font-semibold text-white mt-4">Know Your Scams</h2>
                <p className="text-slate-400 mt-2">Identify specific, technical scam types in a multiple-choice quiz.</p>
            </button>
        </div>
    </div>
  );
};