import React from 'react';
import { Page } from '../types';

interface HomePageProps {
  navigateTo: (page: Page) => void;
}

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

const QuestionMarkCircleIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
  </svg>
);

const DiceIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M21 3.75a.75.75 0 0 0-.75-.75H3.75a.75.75 0 0 0-.75.75v16.5a.75.75 0 0 0 .75.75h16.5a.75.75 0 0 0 .75-.75V3.75zM9 7.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm9 0a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm-4.5 4.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm-4.5 4.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm9 0a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
    </svg>
);

const ExclamationTriangleIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.728 4.5-3.099 4.5H5.146c-2.37 0-4.253-2.5-3.099-4.5L9.4 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" />
  </svg>
);


export const HomePage: React.FC<HomePageProps> = ({ navigateTo }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <div className="max-w-4xl w-full">
        <header className="mb-12">
            <ShieldIcon className="h-20 w-20 mx-auto text-cyan-400" />
          <h1 className="text-4xl md:text-5xl font-bold text-white mt-4">Scamolingo</h1>
          <p className="text-slate-400 mt-4 text-lg">Your personal guide to navigating the digital world safely.</p>
        </header>

        <main className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <button
            onClick={() => navigateTo(Page.ScamInfo)}
            className="group p-8 bg-slate-800/50 rounded-lg border border-slate-700 hover:border-cyan-400 hover:bg-slate-800 transition-all duration-300"
          >
            <BookOpenIcon className="h-12 w-12 mx-auto text-slate-400 group-hover:text-cyan-400 transition-colors" />
            <h2 className="text-xl font-semibold text-white mt-4">Scam Information</h2>
            <p className="text-slate-400 mt-2">Learn about the most common types of online scams.</p>
          </button>

          <button
            onClick={() => navigateTo(Page.RealOrScam)}
            className="group p-8 bg-cyan-500/10 rounded-lg border-2 border-cyan-400 hover:bg-cyan-500/20 transition-all duration-300 transform scale-100 md:scale-105"
          >
            <QuestionMarkCircleIcon className="h-12 w-12 mx-auto text-cyan-300" />
            <h2 className="text-xl font-semibold text-white mt-4">Real or Scam?</h2>
            <p className="text-slate-300 mt-2">Analyze emails, texts, or messages for red flags with AI.</p>
          </button>

          <button
            onClick={() => navigateTo(Page.Protection)}
            className="group p-8 bg-slate-800/50 rounded-lg border border-slate-700 hover:border-cyan-400 hover:bg-slate-800 transition-all duration-300"
          >
            <ShieldIcon className="h-12 w-12 mx-auto text-slate-400 group-hover:text-cyan-400 transition-colors" />
            <h2 className="text-xl font-semibold text-white mt-4">Are You Protected?</h2>
            <p className="text-slate-400 mt-2">Discover actionable tips to enhance your online security.</p>
          </button>
        </main>

         <section className="mt-8 grid grid-cols-1 gap-6">
            <button
                onClick={() => navigateTo(Page.Games)}
                className="group w-full p-6 bg-slate-800/50 rounded-lg border border-slate-700 hover:border-fuchsia-400 hover:bg-slate-800 transition-all duration-300 flex flex-col items-center justify-center"
                >
                <div className="p-2 rounded-full">
                    <DiceIcon className="h-12 w-12 mx-auto text-slate-400 group-hover:text-fuchsia-400 transition-colors" />
                </div>
                <h2 className="text-xl font-semibold text-white mt-4">Games</h2>
                <p className="text-slate-400 mt-2">Test your scam-spotting skills with our interactive games.</p>
            </button>
        </section>
      </div>
    </div>
  );
};