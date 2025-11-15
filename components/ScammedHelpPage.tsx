import React from 'react';

interface ScammedHelpPageProps {
  onBack: () => void;
}

const helpData = [
    {
        icon: '🚨',
        title: 'Step 1: Stop All Contact',
        content: (
            <>
                <p>Do NOT reply, call, or message the scammer again.</p>
                <p className="mt-2">Even saying “I know this is a scam” makes things worse — they will try harder or sell your number to other scammers.</p>
            </>
        ),
    },
    {
        icon: '💳',
        title: 'Step 2: Contact Your Bank Immediately',
        content: (
            <>
                <p>Tell them:</p>
                <blockquote className="border-l-2 border-slate-500 pl-3 italic my-2 text-slate-300">
                    “I believe I was scammed and need to freeze my account/card.”
                </blockquote>
                <p>Ask for:</p>
                <ul className="list-disc list-inside mt-1 space-y-1">
                    <li>Chargeback (for card transactions)</li>
                    <li>Transaction reversal (for bank transfers)</li>
                </ul>
                <p className="mt-2">Banks can sometimes stop the transaction if it’s still pending. For crypto, contact the exchange instantly.</p>
            </>
        ),
    },
    {
        icon: '🔐',
        title: 'Step 3: Secure Your Accounts',
        content: (
            <>
                <p>If you gave away a password, immediately:</p>
                <ul className="list-disc list-inside mt-1 space-y-1">
                    <li>Change that password on that site</li>
                    <li>Change it on ANY other site using the same password</li>
                    <li>Enable Two-Factor Authentication (2FA)</li>
                    <li>Log out of all devices</li>
                </ul>
                <p className="mt-2">Start with your email account, as it's the key to everything else.</p>
            </>
        ),
    },
    {
        icon: '🛑',
        title: 'Step 4: Secure Your Device',
        content: (
             <>
                <p>If you installed a file or app, you MUST:</p>
                <ul className="list-disc list-inside mt-1 space-y-1">
                    <li>Disconnect the device from the internet</li>
                    <li>Run a full antivirus scan</li>
                    <li>Uninstall any suspicious apps</li>
                    <li>Change all your passwords from a DIFFERENT, clean device</li>
                    <li>Consider a factory reset if malware is found</li>
                </ul>
            </>
        ),
    },
    {
        icon: '📱',
        title: 'Step 5: If You Gave Away an OTP',
        content: (
             <>
                <p>Call your bank’s official hotline right now. Tell them:</p>
                 <blockquote className="border-l-2 border-slate-500 pl-3 italic my-2 text-slate-300">
                    “Someone tricked me into giving them my One-Time Password. Please freeze ALL activity.”
                </blockquote>
                <p className="mt-2">OTP-based scams allow immediate access and move extremely fast.</p>
            </>
        ),
    },
    {
        icon: '🆔',
        title: 'Step 6: If You Shared Personal Info',
        content: (
             <>
                <p>If you shared your ID, address, passport, etc., do these immediately:</p>
                <ul className="list-disc list-inside mt-1 space-y-1">
                    <li>Set up fraud alerts with your bank</li>
                    <li>Enable transaction notifications for all amounts</li>
                    <li>Watch for new accounts opened in your name</li>
                </ul>
                <p className="mt-2">Some countries allow you to flag your ID/passport as “compromised.”</p>
            </>
        ),
    },
    {
        icon: '🛒',
        title: 'Step 7: If It Was a Marketplace Scam',
        content: (
            <>
                <p>Do these steps:</p>
                <ul className="list-disc list-inside mt-1 space-y-1">
                    <li>Report the seller on the platform</li>
                    <li>File a claim (e.g., Carousell Protection, Shopee Guarantee)</li>
                    <li>Provide all screenshots and transaction IDs</li>
                </ul>
                <p className="mt-2">Platforms can sometimes freeze scammer accounts and offer refunds.</p>
            </>
        ),
    },
     {
        icon: '🖥️',
        title: 'Step 8: If Device Was Remotely Accessed',
        content: (
            <>
                <p>If you allowed remote access (TeamViewer, AnyDesk):</p>
                <ul className="list-disc list-inside mt-1 space-y-1">
                    <li>Immediately disconnect from the internet</li>
                    <li>Uninstall the remote access software</li>
                    <li>Run an antivirus scan</li>
                    <li>Change all passwords from a clean device</li>
                    <li>Consider a full device wipe as they may have installed other malware</li>
                </ul>
            </>
        ),
    },
    {
        icon: '📝',
        title: 'Step 9: Collect All Evidence',
        content: (
            <>
                <p>Save everything you can:</p>
                <ul className="list-disc list-inside mt-1 space-y-1">
                    <li>Screenshots of chats and profiles</li>
                    <li>Phone numbers, email addresses</li>
                    <li>Bank transaction slips or IDs</li>
                    <li>Website URLs</li>
                </ul>
                <p className="mt-2">This is crucial for police and bank reports.</p>
            </>
        ),
    },
    {
        icon: '👮',
        title: 'Step 10: Report the Scam',
        content: (
            <>
                <p>Report to the authorities:</p>
                <ul className="list-disc list-inside mt-1 space-y-1">
                    <li>
                        <strong className="text-slate-300">Singapore:</strong>{' '}
                        <a href="https://www.police.gov.sg/I-Witness" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">Police E-Report</a>, ScamShield App, or call 1800-722-6688.
                    </li>
                    <li><strong className="text-slate-300">Other Countries:</strong> Your local police, national fraud agency (e.g., FTC in US, Action Fraud in UK).</li>
                    <li>Always report to your bank’s fraud department.</li>
                </ul>
                <p className="mt-2">Reporting helps authorities track scammers and prevents others from becoming victims.</p>
            </>
        ),
    },
    {
        icon: '🌐',
        title: 'Step 11: Warn Your Network',
        content: (
             <>
                <p>Scammers may use your stolen info or accounts to:</p>
                <ul className="list-disc list-inside mt-1 space-y-1">
                    <li>Impersonate you to ask your friends for money</li>
                    <li>Target others in your network</li>
                </ul>
                <p className="mt-2">A simple warning message on social media can prevent more victims.</p>
            </>
        ),
    },
    {
        icon: '💡',
        title: 'Step 12: Learn From It',
        content: (
            <>
                <p>After you are safe, take a moment to review:</p>
                <ul className="list-disc list-inside mt-1 space-y-1">
                    <li>What was the red flag you missed?</li>
                    <li>What tactic did the scammer use (urgency, fear)?</li>
                    <li>What one habit (like calling back on an official number) could have stopped it?</li>
                </ul>
            </>
        ),
    },
];


export const ScammedHelpPage: React.FC<ScammedHelpPageProps> = ({ onBack }) => {
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
        <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-orange-400">
          What to Do If You've Been Scammed
        </h1>
      </header>
      <div className="max-w-4xl mx-auto">
        <p className="text-center text-lg text-slate-300 mb-8 p-4 bg-red-900/50 border border-red-500 rounded-lg">
            Take a deep breath. Acting quickly can make a big difference. Follow these steps now.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {helpData.map((step) => (
            <div key={step.title} className="bg-slate-800 rounded-lg p-6 border border-slate-700 flex flex-col">
              <div className="text-4xl mb-4">{step.icon}</div>
              <h2 className="text-xl font-semibold text-red-400 mb-2">{step.title}</h2>
              <div className="text-slate-400 text-sm space-y-2">{step.content}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};