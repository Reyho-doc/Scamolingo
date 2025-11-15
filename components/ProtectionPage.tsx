
import React from 'react';

interface ProtectionPageProps {
  onBack: () => void;
}

const protectionData = [
  {
    icon: '🔰',
    title: 'The Golden Rule',
    intro: 'The single most effective way to avoid scams is to remember this simple rule. If someone contacts you first asking for money, passwords, or urgent action, always assume it’s a scam.',
    points: [
      '<strong>Assume it’s a scam if:</strong> someone contacts you unexpectedly asking for money, passwords, or personal info.',
      '<strong>Remember:</strong> Legitimate organizations will NEVER call or message you to ask for OTPs or threaten you for immediate payment.',
      '<strong>Trust your gut:</strong> If something feels off, it probably is. End the conversation without feeling rude.',
    ]
  },
  {
    icon: '🎯',
    title: 'Spot the 4 Scam Weapons',
    intro: 'Scammers rely on psychological tricks, not technical genius. Recognize their four main weapons to disarm them.',
    points: [
      '<strong>Urgency:</strong> “Act now or your account will be deleted!” They want you to panic, not think.',
      '<strong>Fear:</strong> “There\'s a warrant for your arrest!” They use threats to make you comply.',
      '<strong>Authority:</strong> “This is the police/your bank.” They impersonate trusted figures.',
      '<strong>Hope/Greed:</strong> “You\'ve won a prize!” They offer something too good to be true.',
    ]
  },
  {
    icon: '⏳',
    title: 'The 5-Second Pause',
    intro: 'Before you click, reply, or pay, take a deep breath and pause for five seconds. This is your most powerful tool.',
    points: [
      '<strong>Break the spell:</strong> A pause shatters the urgency and fear scammers create.',
      '<strong>Engage your brain:</strong> It gives your logical mind a chance to question the situation.',
      '<strong>Ask one question:</strong> "Who benefits if I rush this?" If it\'s the person contacting you, it’s a red flag.',
    ]
  },
  {
    icon: '🔍',
    title: 'Verify, Don\'t Trust',
    intro: 'Never trust information from an unsolicited message or call. Always verify it through a separate, trusted channel.',
    points: [
      '<strong>Bank calls?</strong> Hang up. Call the official number on their website or the back of your card.',
      '<strong>Friend messages for money?</strong> Call them on their known phone number to confirm.',
      '<strong>Suspicious email?</strong> Don\'t click links. Go to the official website by typing it in your browser.',
    ]
  },
  {
    icon: '🔐',
    title: 'Master Passwords & 2FA',
    intro: 'Your accounts are digital vaults. Secure their doors with strong, unique passwords and a second layer of defense.',
    points: [
      '<strong>Use a password manager:</strong> Create and store long, complex, unique passwords for every single account.',
      '<strong>Enable 2FA everywhere:</strong> Use an authenticator app (like Google or Microsoft Authenticator) instead of SMS for the strongest protection.',
      '<strong>Never reuse passwords:</strong> If one site is breached, scammers won\'t get access to all your other accounts.',
    ]
  },
  {
    icon: '🛡️',
    title: 'Secure Devices & Networks',
    intro: 'Your phone and computer are gateways to your digital life. Keep them clean and protected from intruders.',
    points: [
      '<strong>Reboot regularly:</strong> Restart your devices weekly to clear memory and disrupt certain types of malware.',
      '<strong>Review app permissions:</strong> Does that game really need your contacts and microphone? Revoke unnecessary access.',
      '<strong>Avoid public Wi-Fi for sensitive tasks:</strong> Use your mobile data for banking. If you must use public Wi-Fi, use a VPN.',
    ]
  },
  {
    icon: '🔗',
    title: 'Click With Caution',
    intro: 'Every link and attachment is a potential trap. Treat them with suspicion until proven safe.',
    points: [
      '<strong>Hover before you click:</strong> On a computer, see the actual destination URL before you click.',
      '<strong>Check the domain:</strong> Look for misspellings like `paypaI.com` (with a capital I) instead of `paypal.com`.',
      '<strong>Never open unexpected attachments:</strong> Especially `.zip`, `.exe`, or documents that ask you to "enable macros".',
    ]
  },
  {
    icon: '🌐',
    title: 'Social Media Smarts',
    intro: 'What you share on social media can be used against you. Manage your digital footprint wisely.',
    points: [
      '<strong>Lock down your privacy settings:</strong> Make your posts visible to "Friends only," not "Public."',
      '<strong>Don\'t overshare:</strong> Avoid posting your full date of birth, address, or vacation plans.',
      '<strong>Question quizzes:</strong> Many are designed to harvest answers to common security questions (e.g., "your first pet\'s name").',
    ]
  },
  {
    icon: '📵',
    title: 'Phone & Messaging Safety',
    intro: 'Your phone is a primary target. Treat unexpected calls, texts, and messages as potential threats.',
    points: [
      '<strong>Caller ID can be faked:</strong> Scammers can make it look like your bank is calling. Hang up and call back.',
      '<strong>Treat every SMS link as a trap:</strong> Go to the official website or app instead of clicking links in texts.',
      '<strong>Block and report:</strong> Immediately block and report scam numbers and messages to help protect others.',
    ]
  },
  {
    icon: '💳',
    title: 'Banking & Payment Safety',
    intro: 'Protect your money by using secure payment methods and recognizing financial red flags.',
    points: [
      '<strong>Bank transfers are like cash:</strong> Once sent, it\'s nearly impossible to get back. They offer zero protection.',
      '<strong>Never pay with gift cards:</strong> No legitimate business or agency will ever demand payment in gift cards.',
      '<strong>Use credit cards for online purchases:</strong> They offer the best fraud protection and chargeback options.',
    ]
  },
  {
    icon: '🛒',
    title: 'Online Shopping Safety',
    intro: 'Great deals are tempting, but fake stores and scammy sellers are everywhere. Shop smart to avoid getting ripped off.',
    points: [
      '<strong>If it\'s too good to be true, it is:</strong> A new iPhone for 50% off is always a scam.',
      '<strong>Never pay a deposit on marketplaces:</strong> For sites like Facebook Marketplace, pay in person upon inspection.',
      '<strong>Research new websites:</strong> Look for reviews, a physical address, and a professional design before buying.',
    ]
  },
  {
    icon: '🏢',
    title: 'Workplace Safety',
    intro: 'Scammers target businesses with sophisticated attacks. Be the human firewall that protects your company.',
    points: [
      '<strong>Verify "CEO" requests:</strong> If your boss emails asking for an urgent gift card purchase, verbally confirm the request.',
      '<strong>Inspect invoice details:</strong> Scrutinize any email that claims a vendor has "updated their bank account details."',
      '<strong>Report phishing attempts:</strong> Use your company\'s "Report Phishing" button to alert the IT department.',
    ]
  },
  {
    icon: '🤖',
    title: 'Beware of AI & Deepfakes',
    intro: 'Artificial intelligence makes scams more convincing than ever. Be prepared for deception.',
    points: [
      '<strong>Distrust urgent voice messages:</strong> Scammers can clone a loved one\'s voice from a few seconds of audio to fake an emergency.',
      '<strong>Look for tells in video calls:</strong> Watch for unnatural facial movements, poor lip-syncing, or a robotic tone.',
      '<strong>Establish a family safe word:</strong> A secret word only your family knows can defeat a deepfake scammer.',
    ]
  },
  {
    icon: '📈',
    title: 'Guard Career & Finances',
    intro: 'Scammers prey on hopes for a better job or quick financial gains. Approach these opportunities with extreme caution.',
    points: [
      '<strong>Legit jobs don\'t cost money:</strong> Never pay for training, equipment, or a background check upfront.',
      '<strong>"Task-based" jobs are scams:</strong> Any job that requires you to deposit your own money to "unlock" tasks is a scam.',
      '<strong>Guaranteed high returns are a lie:</strong> All real investments carry risk. Promises of guaranteed profits are a huge red flag.',
    ]
  },
  {
    icon: '🚶',
    title: 'Stay Safe in the Physical World',
    intro: 'Not all scams are online. Be aware of your surroundings and common real-world tricks.',
    points: [
      '<strong>Cover the keypad:</strong> When entering your PIN, always shield your hand to block hidden cameras.',
      '<strong>Inspect ATMs:</strong> Look for loose parts or misaligned card readers which could be a skimmer.',
      '<strong>Beware of distraction:</strong> Scammers often work in teams. One person distracts you while another steals your property.',
    ]
  },
  {
    icon: '🧯',
    title: 'What to Do If Scammed',
    intro: 'If the worst happens, acting quickly can limit the damage. Don\'t panic, take these immediate steps.',
    points: [
      '<strong>Contact your bank:</strong> Immediately call their fraud department to freeze accounts and reverse charges.',
      '<strong>Change your passwords:</strong> Start with your email, then change any compromised account and anywhere you reused the password.',
      '<strong>Report it:</strong> File a report with the police and relevant fraud agencies to help authorities and protect others.',
    ]
  },
];


export const ProtectionPage: React.FC<ProtectionPageProps> = ({ onBack }) => {
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
        <h1 className="text-3xl md:text-4xl font-bold text-white">How to Stay Protected</h1>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {protectionData.map((tip) => (
          <div key={tip.title} className="bg-slate-800 rounded-lg p-6 border border-slate-700 flex flex-col">
            <div className="text-4xl mb-4">{tip.icon}</div>
            <div className="flex flex-col flex-grow">
              <h2 className="text-xl font-semibold text-cyan-300 mb-2">{tip.title}</h2>
              <p className="text-slate-400 text-sm mb-3">{tip.intro}</p>
              <ul className="list-disc list-inside text-slate-400 text-sm space-y-2 mt-auto pt-2 border-t border-slate-700/50">
                {tip.points.map((point, index) => <li key={index} dangerouslySetInnerHTML={{ __html: point }} />)}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
