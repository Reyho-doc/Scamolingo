import React, { useState } from 'react';

interface ScamInfoPageProps {
  onBack: () => void;
}

const scamData = [
    {
        title: "Impersonation Scams",
        description: "Scammers pretend to be trusted people or authorities like the police, government agencies, or tech support to trick you.",
        icon: "👤",
        redFlags: [
            "Unexpected contact from an authority figure demanding immediate action.",
            "Threats of arrest, fines, or legal trouble if you don't comply.",
            "Requests for payment through unusual methods like gift cards, wire transfers, or cryptocurrency.",
            "Caller ID or email address looks legitimate but the request is suspicious.",
        ],
        subCategories: [
            { title: "Authority Impersonation", examples: ["Police/Tax authority scams", "Immigration/Court warrant scams", "Government grant/Customs parcel scams"] },
            { title: "Financial Institution Impersonation", examples: ["Fake bank staff calls", "'Fraud department' alerts", "Account freeze/verification scams", "Fake chargeback/refund calls"] },
            { title: "Corporate Impersonation", examples: ["Fake Amazon/Apple/Microsoft support", "Fake telco representatives", "Fake delivery couriers"] },
            { title: "Personal Impersonation", examples: ["'Friend in trouble' message scam", "Hijacked social media accounts", "Fake family needing urgent money", "Deepfake voice/video calls"] },
        ],
    },
    {
        title: "Phishing Scams",
        description: "Tricking someone into revealing sensitive information (like passwords or credit card numbers) by using fake links and websites.",
        icon: "🎣",
        redFlags: [
            "Emails or texts with generic greetings like 'Dear Customer'.",
            "Spelling and grammar mistakes.",
            "A link that, when hovered over, shows a different URL from the one displayed.",
            "Creating a sense of urgency, like 'Your account will be suspended'.",
        ],
        subCategories: [
            { title: "Standard Phishing", examples: ["Fake login pages (Google, PayPal)", "Fake banking portals", "Fake password reset links"] },
            { title: "Smishing (SMS Phishing)", examples: ["Fake delivery/bank/bill SMS", "Fake 2FA code interception"] },
            { title: "Spear-Phishing", examples: ["Highly targeted attacks using personal data to seem real"] },
            { title: "QR Code Phishing (Quishing)", examples: ["Fake 'Scan to pay' QR codes", "Fake parking/restaurant QR menus"] },
        ],
    },
    {
        title: "Financial & Investment Scams",
        description: "Luring victims with promises of high returns with little to no risk, often involving complex or fake investment products.",
        icon: "📈",
        redFlags: [
            "Guarantees of high returns with zero risk.",
            "Pressure to act immediately ('once-in-a-lifetime opportunity').",
            "Vague details about the investment.",
            "Requirement to pay in cryptocurrency or via wire transfer.",
        ],
        subCategories: [
            { title: "Classic Investment Scams", examples: ["Ponzi/Pyramid schemes", "MLM fraud", "Fake forex/stock tips"] },
            { title: "Crypto/Virtual Asset Scams", examples: ["Fake crypto exchanges", "Phishing for seed phrases", "High-yield staking scams", "Rug pulls", "Wallet drainers"] },
            { title: "Pump-and-Dump Groups", examples: ["Telegram/WeChat 'investment clubs'", "Fake AI trading bots"] },
        ],
    },
    {
        title: "Online Sales & Ecommerce Scams",
        description: "Fraud related to buying and selling goods online, including fake stores, non-delivery of items, and payment tricks.",
        icon: "🛒",
        redFlags: [
            "Prices that are significantly lower than on other websites.",
            "Newly created websites with no reviews or contact information.",
            "Sellers who insist on payment outside of the platform's official methods.",
            "Buyers offering to overpay and asking for the difference back.",
        ],
        subCategories: [
            { title: "Marketplace Scams", examples: ["Buyer overpayment scams", "Fake escrow", "Fake delivery tracking", "Brushing scams", "Empty box sales"] },
            { title: "Fake Online Stores", examples: ["Copycat brand stores", "'Limited-time sale' fraud stores", "No-refund apparel stores"] },
            { title: "Ticket Scams", examples: ["Fake concert/airline tickets", "Resale ticket fraud"] },
        ],
    },
    {
        title: "Tech Support & Access Scams",
        description: "Scammers pose as tech support agents to gain remote access to your device, steal data, or charge for fake services.",
        icon: "💻",
        redFlags: [
            "Unsolicited pop-ups or calls about a computer virus.",
            "Requests for remote access to your device.",
            "Demands for payment for technical support, especially with gift cards.",
            "Browser-locking warnings that demand you call a number.",
        ],
        subCategories: [
            { title: "Remote Access Scams", examples: ["'Your computer has a virus'", "Fake Microsoft/Apple support calls"] },
            { title: "Device Locking/Extortion", examples: ["Ransomware attacks", "Device password reset hijack", "Fake antivirus subscriptions"] },
        ],
    },
    {
        title: "Romance & Social Manipulation Scams",
        description: "Criminals build emotional connections or trust over time to manipulate victims into sending money or investing in fraudulent schemes.",
        icon: "❤️",
        redFlags: [
            "Online profiles that seem too perfect.",
            "Quickly professing strong feelings of love.",
            "Consistently avoiding video calls or meeting in person.",
            "Asking for money for emergencies, travel, or investments.",
        ],
        subCategories: [
            { title: "Romance Scams", examples: ["Long-term emotional manipulation", "Fake overseas lovers", "'I need money to visit you'"] },
            { title: "Pig-Butchering Scams", examples: ["Combines romance with a fraudulent investment opportunity"] },
            { title: "Companionship Scams", examples: ["Fake models asking for gifts", "Blackmail using fake nudes"] },
        ],
    },
    {
        title: "Job & Income Scams",
        description: "Luring victims with attractive but fake job opportunities to steal personal information or trick them into paying for non-existent services.",
        icon: "💼",
        redFlags: [
            "Job offers that seem too good to be true (high pay, no experience).",
            "Interviews conducted solely via text or messaging apps.",
            "Requests for you to pay for equipment, training, or a background check.",
            "'Task-based' jobs that require you to deposit money to earn commissions.",
        ],
        subCategories: [
            { title: "Fake Job Offers", examples: ["Advance payment for equipment", "Fake background checks (pay-to-verify)"] },
            { title: "Part-Time Income Scams", examples: ["'Like and earn' scams", "'Task commission' scams"] },
            { title: "Recruitment Scams", examples: ["Fake recruiters on LinkedIn", "Impersonation of real HR officers"] },
        ],
    },
    {
        title: "Loan & Money Lending Scams",
        description: "Offering fake loans or financial aid with the goal of stealing an upfront 'admin fee' or personal financial data.",
        icon: "💸",
        redFlags: [
            "Approval of a loan without a credit check.",
            "Requiring an advance fee or deposit before the loan is disbursed.",
            "High-pressure tactics to force a quick decision.",
            "Unprofessional communication and lack of official documentation.",
        ],
        subCategories: [
            { title: "Illegal Moneylenders", examples: ["Loan sharks", "Threat/extortion-based loans"] },
            { title: "Fake Financial Aid", examples: ["'Government relief fund' scams", "Fake scholarship/emergency loans"] },
            { title: "Deposit-Before-Loan Scams", examples: ["'Pay admin fee to unlock loan'"] },
        ],
    },
    {
        title: "Delivery & Logistics Scams",
        description: "Scammers impersonate delivery companies to trick you into paying fake fees or revealing personal information.",
        icon: "📦",
        redFlags: [
            "Unexpected messages about a delivery you didn't order.",
            "Requests for a small payment for customs, taxes, or redelivery.",
            "Links to fake tracking websites designed to steal your logins.",
            "Delivery drivers asking for your OTP (One-Time Password).",
        ],
        subCategories: [
            { title: "Parcel Scams", examples: ["'Parcel stuck in customs'", "Fake shipping/tax fees", "Fake courier redelivery fee"] },
            { title: "Lost Package Scams", examples: ["'You missed a delivery'", "Fake deliverymen collecting OTPs"] },
        ],
    },
    {
        title: "Social Engineering & Manipulation",
        description: "Using psychological manipulation to trick users into making security mistakes or giving away sensitive information.",
        icon: "🧠",
        redFlags: [
            "Creating a sense of urgency, fear, or curiosity to bypass logical thinking.",
            "Appealing to authority or sympathy.",
            "Offering something that is too good to be true.",
            "Requesting information that is not necessary for the transaction.",
        ],
        subCategories: [
            { title: "Psychological Traps", examples: ["Urgency and fear tactics", "Authority pressure", "Fraud sympathy traps", "'I'm in danger' deepfake calls"] },
            { title: "Information Harvesting", examples: ["Online quizzes", "Fake surveys", "Data-collection games"] },
        ],
    },
    {
        title: "Charity & Donation Scams",
        description: "Exploiting generosity by creating fake charities, especially after natural disasters or during holidays.",
        icon: "❤️‍🩹",
        redFlags: [
            "High-pressure tactics to donate immediately.",
            "Vague mission statements and refusal to provide proof of charitable status.",
            "Names that are very similar to legitimate, well-known charities.",
            "Requests for donations via gift cards or cryptocurrency.",
        ],
        subCategories: [
            { title: "Disaster Charity Scams", examples: ["'Donate to earthquake/flood victims'", "Fake humanitarian aid orgs"] },
            { title: "Religious Donation Scams", examples: ["Fake temple/church/mosque fundraisers"] },
            { title: "Crypto-Only Charity Scams", examples: ["Donation drives that only accept cryptocurrency."] },
        ],
    },
     {
        title: "Rental, Housing & Property Scams",
        description: "Scammers post fake listings for rental properties to collect deposits for places that don't exist or aren't for rent.",
        icon: "🏡",
        redFlags: [
            "Landlord asks for a deposit or first month's rent before you've seen the property.",
            "The rent is significantly lower than similar properties in the area.",
            "Pressure to make a decision and pay immediately.",
            "The landlord is conveniently out of the country and cannot meet you.",
        ],
        subCategories: [
            { title: "Fake Landlords", examples: ["Asking for deposit before viewing", "Fake rental listings"] },
            { title: "Property Investment Scams", examples: ["Fake real estate agent impersonation", "Overseas property investment traps"] },
            { title: "Tenancy Scams", examples: ["Duplicate leases to multiple tenants"] },
        ],
    },
    {
        title: "Travel & Leisure Scams",
        description: "Offering fake vacation packages, airline tickets, or hotel reservations at unbelievably low prices.",
        icon: "✈️",
        redFlags: [
            "Deals that are far cheaper than any legitimate competitor.",
            "Requests for payment via direct bank transfer instead of secure platforms.",
            "Lack of professional websites, contracts, or ATOL/ABTA protection.",
        ],
        subCategories: [
            { title: "Fake Tours and Packages", examples: ["'Cheap tour package' scams", "Fake hotels/reservations"] },
            { title: "Visa/Immigration Scams", examples: ["Fake visa consultants", "Fake embassy emails"] },
        ],
    },
    {
        title: "Healthcare & Insurance Scams",
        description: "Selling fake medical treatments, miracle cures, or fraudulent insurance policies.",
        icon: "⚕️",
        redFlags: [
            "Promised 'miracle cures' for serious diseases.",
            "High-pressure sales tactics for supplements or treatments.",
            "Fake insurance agents collecting premiums for non-existent policies.",
        ],
        subCategories: [
            { title: "Fake Medical Treatments", examples: ["Miracle cures", "Supplement scams", "Fake stem cell therapy"] },
            { title: "Insurance Agent Scams", examples: ["Fake claims processes", "Fake premium collection"] },
        ],
    },
    {
        title: "Business Scams (B2B)",
        description: "Targeting businesses with fraudulent invoices or by impersonating senior executives to authorize payments.",
        icon: "🏢",
        redFlags: [
            "Emails requesting an urgent payment to a new or different bank account.",
            "An email from a 'CEO' or 'CFO' instructing an urgent, secret purchase of gift cards.",
            "Unsolicited invoices for services or directory listings you never ordered.",
        ],
        subCategories: [
            { title: "Invoice Fraud", examples: ["Fake vendor invoices", "'Changed bank account number' scam"] },
            { title: "CEO Impersonation Scams", examples: ["'Buy gift cards urgently'", "Fake email from CFO/CEO"] },
        ],
    },
    {
        title: "Subscription & Service Scams",
        description: "Tricking users into signing up for unwanted subscriptions or sending fake renewal notices for services.",
        icon: "🔁",
        redFlags: [
            "Unexpected bills or renewal notices for services you don't remember subscribing to.",
            "Difficulty in finding how to cancel a 'free trial'.",
            "Phishing emails disguised as renewal notices from popular services like Netflix or McAfee.",
        ],
        subCategories: [
            { title: "Fake Subscriptions", examples: ["Antivirus auto-renewal", "Streaming service renewal scams", "App store subscription phishing"] },
            { title: "Billing Scams", examples: ["Fake overdue bills (power, water, telco)"] },
        ],
    },
    {
        title: "AI-Era New Generation Scams",
        description: "Leveraging artificial intelligence to create highly convincing scams, including deepfake audio and video.",
        icon: "🤖",
        redFlags: [
            "A frantic call from a loved one where the voice sounds slightly off or robotic.",
            "Video calls with unnatural facial movements or poor lip-syncing.",
            "Influencers or financial gurus in videos promoting risky investments with overly aggressive language.",
        ],
        subCategories: [
            { title: "Deepfake Identity Scams", examples: ["Voice cloning ransoms", "Video-call impersonation", "Fake livestreams"] },
            { title: "AI-Generated Influencer Scams", examples: ["AI models promoting scams", "Fake financial guru deepfakes"] },
            { title: "Synthetic Identity Scams", examples: ["Entirely fabricated digital personas used for fraud"] },
            { title: "AI Scam Bots", examples: ["Real-time chat impersonation", "AI agents in romance scams"] },
        ],
    },
    {
        title: "Physical-World Scams",
        description: "Traditional, in-person scams that trick people in public spaces.",
        icon: "🚶",
        redFlags: [
            "Someone approaching you with a story that requires you to hand over money or valuables.",
            "Distraction techniques used at ATMs or cash registers.",
            "High-pressure situations on the street that don't give you time to think.",
        ],
        subCategories: [
            { title: "Street Scams", examples: ["Three-card monte", "Fake monks asking for donations", "Counterfeit products"] },
            { title: "ATM Scams", examples: ["ATM skimmers", "Fake keypad overlays", "Hidden cameras"] },
        ],
    },
    {
        title: "Tax, Legal, or Document Scams",
        description: "Using the threat of legal or financial penalties to extort money, often by impersonating government officials.",
        icon: "📜",
        redFlags: [
            "Threats of immediate arrest for tax evasion.",
            "Receiving a 'fine' or 'summons' via email or text message.",
            "Being asked to pay a fine with gift cards or cryptocurrency.",
        ],
        subCategories: [
            { title: "Fake Fines", examples: ["Fake speeding tickets", "Fake court summons"] },
            { title: "Document Forgery", examples: ["Fake medical certificates", "Fake degrees/certificates"] },
        ],
    },
    {
        title: "Miscellaneous / Rare Scams",
        description: "A collection of other specific and less common scams targeting particular situations or emotional triggers.",
        icon: "❓",
        redFlags: [
            "Any situation that feels odd, rushed, or emotionally manipulative.",
            "Offers that require you to pay money to receive something of greater value.",
            "Requests for personal information that seem irrelevant to the situation.",
        ],
        subCategories: [
            { title: "'Blessing' Scams", examples: ["Fortune teller steals valuables to 'cleanse' them"] },
            { title: "Pet Adoption & Lost Pet Scams", examples: ["Fake listings for pets", "Scammers claiming to have your lost pet for a reward"] },
            { title: "Sugar Daddy/Mommy Scams", examples: ["Asks you to pay a fee or use your bank account for transfers"] },
            { title: "Blackmail Scams", examples: ["Using fake hacked accounts or explicit material to extort money"] },
        ],
    },
];


const Accordion: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mt-4 border-t border-slate-700 pt-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left font-semibold text-slate-200"
      >
        <span>⚠️ {title}</span>
        <span className={`transform transition-transform duration-200 ${isOpen ? 'rotate-90' : ''}`}>
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </span>
      </button>
      {isOpen && (
        <div className="mt-2">
          {children}
        </div>
      )}
    </div>
  );
};


export const ScamInfoPage: React.FC<ScamInfoPageProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen p-4 sm:p-6 md:p-8">
      <header className="flex items-center mb-6">
        <button
          onClick={onBack}
          className="mr-4 p-2 rounded-full hover:bg-slate-700 transition-colors"
          aria-label="Go back"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-teal-400">
          Common Scam Types
        </h1>
      </header>
      <p className="max-w-4xl text-slate-400 mb-8 ml-0 md:ml-12">
        Knowledge is your best defense. Familiarize yourself with the tactics scammers use so you can spot them before it's too late. Here are some of the most prevalent scams to watch out for.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {scamData.map((scam) => (
          <div key={scam.title} className="bg-slate-800 rounded-lg p-6 border border-slate-700 flex flex-col">
            <div className="flex-grow">
              <div className="text-4xl mb-4">{scam.icon}</div>
              <h2 className="text-xl font-semibold text-cyan-300 mb-2">{scam.title}</h2>
              <p className="text-slate-400 mb-4 text-sm">{scam.description}</p>
              
              <div className="space-y-2">
                {scam.subCategories.map(sub => (
                    <div key={sub.title}>
                        <h4 className="font-semibold text-slate-300 text-sm">{sub.title}</h4>
                        <p className="text-xs text-slate-400 leading-relaxed">{sub.examples.join(', ')}</p>
                    </div>
                ))}
              </div>
            </div>

            <Accordion title="Watch out for">
              <ul className="list-disc list-inside text-slate-400 space-y-1 text-sm">
                {scam.redFlags.map((flag, index) => (
                  <li key={index}>{flag}</li>
                ))}
              </ul>
            </Accordion>

          </div>
        ))}
      </div>
    </div>
  );
};
