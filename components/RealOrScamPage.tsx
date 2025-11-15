

import React, { useState } from 'react';
import { analyzeTextForScam, analyzeUrlForScam } from '../services/geminiService';

interface RealOrScamPageProps {
  onBack: () => void;
  onUrlScanned: () => void;
}

// --- Icons ---
const LoadingSpinner: React.FC = () => (
    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);

const ExclamationTriangleIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.728 4.5-3.099 4.5H5.146c-2.37 0-4.253-2.5-3.099-4.5L9.4 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" />
    </svg>
);

const ShieldCheckIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M12.963 2.286a.75.75 0 0 0-1.071 0 26.68 26.68 0 0 0-5.972 7.72 27.23 27.23 0 0 0-2.28 7.72c0 3.865 1.58 7.543 4.362 10.068a.75.75 0 0 0 1.214-.882A24.708 24.708 0 0 1 8.5 17.5a25.115 25.115 0 0 1 3.11-10.843A25.115 25.115 0 0 1 15.5 17.5c.321 2.218.52 4.453.568 6.695a.75.75 0 0 0 1.214.882c2.782-2.525 4.362-6.203 4.362-10.068a27.23 27.23 0 0 0-2.28-7.72 26.68 26.68 0 0 0-5.972-7.72Z" clipRule="evenodd" />
    </svg>
);

const QuestionMarkCircleIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
    </svg>
);


const AnalysisResult: React.FC<{ content: string }> = ({ content }) => {
    const lines = content.split('\n');
    const verdictLine = lines[0] || '';
    const details = lines.slice(1).filter(line => line.trim() !== '');

    let verdict = 'Analysis Result';
    let verdictColor = 'text-white';
    let bgColor = 'bg-slate-800';
    let borderColor = 'border-slate-700';
    let Icon = QuestionMarkCircleIcon;
    let iconColor = 'text-slate-400';

    if (verdictLine.includes('Likely a Scam')) {
        verdict = 'Likely a Scam';
        verdictColor = 'text-red-300';
        bgColor = 'bg-red-900/30';
        borderColor = 'border-red-500/50';
        Icon = ExclamationTriangleIcon;
        iconColor = 'text-red-400';
    } else if (verdictLine.includes('Potentially a Scam')) {
        verdict = 'Potentially a Scam';
        verdictColor = 'text-amber-300';
        bgColor = 'bg-amber-900/30';
        borderColor = 'border-amber-500/50';
        Icon = ExclamationTriangleIcon;
        iconColor = 'text-amber-400';
    } else if (verdictLine.includes('Likely Legitimate')) {
        verdict = 'Likely Legitimate';
        verdictColor = 'text-green-300';
        bgColor = 'bg-green-900/30';
        borderColor = 'border-green-500/50';
        Icon = ShieldCheckIcon;
        iconColor = 'text-green-400';
    }

    return (
        <div className={`mt-8 p-6 rounded-lg border ${bgColor} ${borderColor}`}>
            <div className="flex items-center mb-4">
                <Icon className={`h-8 w-8 mr-3 ${iconColor}`} />
                <h2 className={`text-2xl font-semibold ${verdictColor}`}>{verdict}</h2>
            </div>
            <ul className="list-disc list-inside text-slate-300 space-y-2">
                {details.map((line, index) => (
                    <li key={index}>{line.replace('* ', '')}</li>
                ))}
            </ul>
        </div>
    );
};


export const RealOrScamPage: React.FC<RealOrScamPageProps> = ({ onBack, onUrlScanned }) => {
  const [activeTab, setActiveTab] = useState<'text' | 'url'>('text');
  
  const [text, setText] = useState('');
  const [textResult, setTextResult] = useState('');
  const [isTextLoading, setIsTextLoading] = useState(false);
  const [textError, setTextError] = useState('');

  const [url, setUrl] = useState('');
  const [urlResult, setUrlResult] = useState('');
  const [isUrlLoading, setIsUrlLoading] = useState(false);
  const [urlError, setUrlError] = useState('');


  const handleAnalyzeText = async () => {
    setIsTextLoading(true);
    setTextResult('');
    setTextError('');
    const analysisResult = await analyzeTextForScam(text);
    if (analysisResult.startsWith('Sorry')) {
        setTextError(analysisResult);
    } else {
        setTextResult(analysisResult);
    }
    setIsTextLoading(false);
  };

  const handleAnalyzeUrl = async () => {
    setIsUrlLoading(true);
    setUrlResult('');
    setUrlError('');
    const analysisResult = await analyzeUrlForScam(url);
    if (analysisResult.startsWith('Sorry') || analysisResult.startsWith('Please')) {
        setUrlError(analysisResult);
    } else {
        setUrlResult(analysisResult);
        onUrlScanned();
    }
    setIsUrlLoading(false);
  };

  return (
    <div className="min-h-screen p-4 sm:p-6 md:p-8">
      <header className="flex items-center mb-8">
        <button
          onClick={onBack}
          className="mr-4 p-2 rounded-full hover:bg-slate-700 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-3xl md:text-4xl font-bold text-white">Real or Scam?</h1>
      </header>
      
      <div className="max-w-3xl mx-auto">
        <div className="mb-6 border-b border-slate-700 flex">
            <button
                onClick={() => setActiveTab('text')}
                className={`py-3 px-6 font-semibold transition-colors ${activeTab === 'text' ? 'text-cyan-400 border-b-2 border-cyan-400' : 'text-slate-400 hover:text-white'}`}
            >
                Analyze Text
            </button>
            <button
                onClick={() => setActiveTab('url')}
                className={`py-3 px-6 font-semibold transition-colors ${activeTab === 'url' ? 'text-cyan-400 border-b-2 border-cyan-400' : 'text-slate-400 hover:text-white'}`}
            >
                Analyze URL
            </button>
        </div>

        {activeTab === 'text' && (
          <div>
            <p className="text-slate-400 mb-4">
              Paste the content of a suspicious email, text message, or social media post below. Our AI will analyze it for common signs of a scam.
            </p>
            
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="e.g., 'Congratulations! You've won a $1000 gift card. Click here to claim...'"
              className="w-full h-48 p-4 bg-slate-800 border border-slate-600 rounded-md text-slate-300 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition"
            />

            <button
              onClick={handleAnalyzeText}
              disabled={isTextLoading || !text}
              className="mt-4 w-full flex items-center justify-center bg-cyan-600 text-white font-bold py-3 px-4 rounded-md hover:bg-cyan-700 disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors"
            >
              {isTextLoading ? <LoadingSpinner /> : 'Analyze Text'}
            </button>

            {textError && <div className="mt-8 p-6 bg-slate-800 rounded-lg border border-slate-700 text-red-400">{textError}</div>}
            {textResult && <AnalysisResult content={textResult} />}
          </div>
        )}
        
        {activeTab === 'url' && (
          <div>
            <p className="text-slate-400 mb-4">
              Enter a full website URL below. Our AI will analyze it for signs of phishing, impersonation, or other malicious intent.
            </p>
            
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="e.g., https://your-bank.security-alert.com"
              className="w-full p-4 bg-slate-800 border border-slate-600 rounded-md text-slate-300 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition"
            />

            <button
              onClick={handleAnalyzeUrl}
              disabled={isUrlLoading || !url}
              className="mt-4 w-full flex items-center justify-center bg-cyan-600 text-white font-bold py-3 px-4 rounded-md hover:bg-cyan-700 disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors"
            >
              {isUrlLoading ? <LoadingSpinner /> : 'Analyze URL'}
            </button>

            {urlError && <div className="mt-8 p-6 bg-slate-800 rounded-lg border border-slate-700 text-red-400">{urlError}</div>}
            {urlResult && <AnalysisResult content={urlResult} />}
          </div>
        )}
      </div>
    </div>
  );
};