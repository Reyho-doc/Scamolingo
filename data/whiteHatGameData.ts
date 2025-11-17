export interface Objective {
  type: 'analyze' | 'trace' | 'domain' | 'app' | 'botnet';
  _done?: boolean;
}

export interface WebsiteCase {
  id: number; // Corresponds to the index in MESSAGES array
  title: string;
  objectives: Objective[];
  reward: number;
  _isComplete?: boolean;
}

export interface IncorrectFeedback {
  option: string;
  feedback: string;
}

export interface Message {
  from: string;
  subject: string;
  preview: string;
  type: string;
  correct: string;
  teach: string;
  incorrectFeedback: IncorrectFeedback[];
  maliciousDomains: string[];
}

export interface ShopItem {
    id: string;
    name: string;
    cost: number;
    desc: string;
    apply: (tools: GameTools) => GameTools;
}

export interface GameTools {
    scannerLevel: number;
    traceLevel: number;
    domainLevel: number;
    botnetTools: number;
}

export interface AppProfile {
    name: string;
    signature: string[];
    isMalicious: boolean;
    teach: string;
}

export const WEBSITE_CASES: WebsiteCase[] = [
    {
      id: 0,
      title: "DHL Phishing Case",
      objectives: [
        { type: "analyze" },
        { type: "domain" },
        { type: "trace" },
      ],
      reward: 40
    },
    {
      id: 1,
      title: "Suspicious Banking App",
      objectives: [
        { type: "analyze" },
        { type: "app" },
        { type: "trace" },
      ],
      reward: 60
    },
    {
      id: 2,
      title: "Malicious Keyboard App",
      objectives: [
        { type: "analyze" },
        { type: "app" },
        { type: "botnet" },
      ],
      reward: 80
    },
    {
      id: 3,
      title: "Airport Wi-Fi Trap",
      objectives: [ { type: "analyze" }, { type: "trace" }, { type: "botnet" } ],
      reward: 75
    },
    {
      id: 4,
      title: "Mega Lottery Phish",
      objectives: [ { type: "analyze" }, { type: "domain" } ],
      reward: 35
    },
    {
      id: 5,
      title: "Cracked Software Lure",
      objectives: [ { type: "analyze" }, { type: "app" }, { type: "trace" } ],
      reward: 65
    },
    {
      id: 6,
      title: "AI Keyboard Logger",
      objectives: [ { type: "analyze" }, { type: "app" }, { type: "botnet" } ],
      reward: 85
    }
];

export const MESSAGES: Message[] = [
    {
      from: "dhl-express@dh1.com",
      subject: "Urgent: unpaid import fees for parcel #7842",
      preview: "Dear user, your shipment is detained. Pay import fees in 24 hours: hxxp://dh1-express.com/pay",
      type: "smishing",
      correct: "Mobile Phishing (Smishing)",
      teach: "Smishing: look for slightly odd domains, pressure, and short links. Type the courier's URL yourself or use official tracking.",
      incorrectFeedback: [
          { option: "Repackaging / Phishing", feedback: "Incorrect. 'Repackaging' involves modifying a legitimate app. This scam uses a fake website link, which is classic phishing, but not repackaging." },
          { option: "Rogue Keyboard", feedback: "Incorrect. A Rogue Keyboard scam involves installing a malicious keyboard app. This scam uses a deceptive link, not a malicious app." },
          { option: "Man-in-the-Middle", feedback: "Incorrect. A Man-in-the-Middle attack intercepts live communication. This scam is delivered directly via SMS and relies on you clicking a fake link." }
      ],
      maliciousDomains: ["dh1-express.com", "dh1.com"]
    },
    {
      from: "bank-secure@safebank.com",
      subject: "Update required: secure your account",
      preview: "We detected suspicious activity. Click link to re-authenticate: hxxp://safebank-login.com. As a precaution we've attached our new security app.",
      type: "repackaging",
      correct: "Repackaging / Phishing",
      teach: "Phishing pages use look-alike domains. Never click; instead visit the official site or app, and check certificate/URL carefully.",
      incorrectFeedback: [
          { option: "Mobile Phishing (Smishing)", feedback: "Incorrect. While this is phishing, the term 'Smishing' specifically refers to phishing attacks delivered via SMS (text message)." },
          { option: "Rogue Keyboard", feedback: "Incorrect. This attack doesn't involve installing a malicious keyboard; it's focused on getting you to visit a fake website." },
          { option: "Man-in-the-Middle", feedback: "Incorrect. This is a direct phishing attempt, not an interception of existing network traffic." }
      ],
      maliciousDomains: ["safebank-login.com"]
    },
    {
      from: "update@coolkeyboard.app",
      subject: "Mandatory update: improve typing performance",
      preview: "Install this keyboard to get themes and special emoji pack. It asks for full keyboard access. It may also join a network to improve suggestions.",
      type: "roguekeyboard",
      correct: "Rogue Keyboard",
      teach: "Rogue keyboards can capture all typed input. Only install trusted keyboards and review permissions.",
      incorrectFeedback: [
          { option: "Mobile Phishing (Smishing)", feedback: "Incorrect. Phishing and Smishing use deceptive links to steal credentials. This scam involves installing malicious software." },
          { option: "Repackaging / Phishing", feedback: "Incorrect. 'Repackaging' involves modifying an existing app. While similar, a 'Rogue Keyboard' is a distinct type of malicious app built from the ground up to steal keystrokes." },
          { option: "Man-in-the-Middle", feedback: "Incorrect. The threat here is the malicious app itself, not an interception of your network data." }
      ],
      maliciousDomains: ["coolkeyboard.app"]
    },
    {
      from: "airport-wifi-connect@portal.net",
      subject: "Connect to Free Airport Wi-Fi",
      preview: "Welcome! To connect, please log in with your Google account to authenticate our terms of service. This network is unencrypted.",
      type: "mitm",
      correct: "Man-in-the-Middle",
      teach: "Public Wi-Fi can be used for Man-in-the-Middle attacks. Avoid logging into sensitive accounts. The 'unencrypted' warning is a major red flag.",
      incorrectFeedback: [
          { option: "Mobile Phishing (Smishing)", feedback: "Incorrect. This isn't an SMS and the primary threat is network interception, not just a fake website link." },
          { option: "Repackaging / Phishing", feedback: "Incorrect. No app is being installed or modified here; the attack vector is the network itself." },
          { option: "Rogue Keyboard", feedback: "Incorrect. This scam doesn't involve a malicious keyboard app; it's about network security." }
      ],
      maliciousDomains: ["portal.net"]
    },
    {
      from: "winner@megalotto.info",
      subject: "You've Won $1,000,000!",
      preview: "Congratulations! You are the winner of our grand prize. To claim, please provide your details on our secure site: hxxp://megalotto-claims.net",
      type: "smishing",
      correct: "Mobile Phishing (Smishing)",
      teach: "Unsolicited prize notifications are a classic phishing tactic. The URL is not from an official lottery organization.",
      incorrectFeedback: [
          { option: "Repackaging / Phishing", feedback: "Incorrect. This is a lure to a website, not a modified malicious application." },
          { option: "Rogue Keyboard", feedback: "Incorrect. This scam uses a deceptive link, not a malicious keyboard app." },
          { option: "Man-in-the-Middle", feedback: "Incorrect. This is a direct phishing attempt, not an interception of existing network traffic." }
      ],
      maliciousDomains: ["megalotto-claims.net", "megalotto.info"]
    },
    {
      from: "admin@pro-tools-cracked.com",
      subject: "Download ProEditor v3 for Free!",
      preview: "Get the full version of ProEditor for free! Our version is fully unlocked. Just install the attached APK and enjoy.",
      type: "repackaging",
      correct: "Repackaging / Phishing",
      teach: "Downloading 'cracked' software is a common way to get infected with malware. The app is likely a repackaged version of the real one with malicious code injected.",
       incorrectFeedback: [
          { option: "Mobile Phishing (Smishing)", feedback: "Incorrect. This involves downloading a malicious app, not just visiting a fake website from an SMS." },
          { option: "Rogue Keyboard", feedback: "Incorrect. While it's a malicious app, it's not specifically a keyboard. It's a modified version of another app." },
          { option: "Man-in-the-Middle", feedback: "Incorrect. The threat is the downloaded file, not network interception." }
      ],
      maliciousDomains: ["pro-tools-cracked.com"]
    },
    {
      from: "support@aitype.pro",
      subject: "Your New AI Keyboard is here!",
      preview: "Stop typing! Let our new AI keyboard write your emails for you. It requires full network access to connect to our AI servers for the best results.",
      type: "roguekeyboard",
      correct: "Rogue Keyboard",
      teach: "A keyboard asking for 'full network access' is suspicious. It could be sending everything you type to a remote server.",
       incorrectFeedback: [
          { option: "Mobile Phishing (Smishing)", feedback: "Incorrect. This scam involves installing malicious software, not a deceptive link in a text message." },
          { option: "Repackaging / Phishing", feedback: "Incorrect. This is a standalone malicious keyboard app, not a modified version of another existing app." },
          { option: "Man-in-the-Middle", feedback: "Incorrect. The threat is the malicious app itself, not an interception of your network data." }
      ],
      maliciousDomains: ["aitype.pro"]
    }
];

export const SHOP_ITEMS: ShopItem[] = [
    { id: "scan", name: "Scanner Upgrade", cost: 30, desc: "Removes incorrect choices in 'Analyze Message' and speeds it up.", apply: (tools) => ({...tools, scannerLevel: tools.scannerLevel + 1}) },
    { id: "trace", name: "Trace Suite", cost: 40, desc: "Improves maze size and proxy bonuses.", apply: (tools) => ({...tools, traceLevel: tools.traceLevel + 1}) },
    { id: "domain", name: "Domain AI", cost: 35, desc: "Allows typos during domain analysis. Lvl 2: 1 typo, Lvl 3: 2, etc.", apply: (tools) => ({...tools, domainLevel: tools.domainLevel + 1}) },
    { id: "bot", name: "Botnet Toolkit", cost: 50, desc: "Faster botnet takedown.", apply: (tools) => ({...tools, botnetTools: tools.botnetTools + 1}) }
];

export const APP_POOL: AppProfile[] = [
      { name: "CoolKeyboard.apk", signature: ["full-keyboard-access","sends-keystrokes-http","clipboard-read"], isMalicious: true, teach: "This is a Rogue Keyboard. The signature 'sends-keystrokes-http' is a major red flag for data theft." },
      { name: "BankFast_Official.apk", signature: ["signature-valid","api-usage-normal","no-overlay-permission"], isMalicious: false, teach: "This appears to be a legitimate app with a valid signature and normal behavior." },
      { name: "SafeBank_Security.apk", signature: ["signature-mismatch","dex-injection","overlay-service-active"], isMalicious: true, teach: "This is a Repackaged Trojan. The 'signature-mismatch' and 'overlay-service-active' flags indicate tampering to steal credentials." },
      { name: "PhotoEditPlus.apk", signature: ["permission-storage-access","ads-sdk-integrated","no-network-bg-activity"], isMalicious: false, teach: "This app seems safe. While it has ads, it doesn't exhibit suspicious background network activity." },
      { name: "FreeVPN.apk", signature: ["requests-sms-read","bg-service-always-on","unusual-data-usage"], isMalicious: true, teach: "Malicious! A VPN should not need to read your SMS messages. This is likely spyware." },
      { name: "SimpleCalc.apk", signature: ["no-permissions-required","offline-capable","valid-developer-cert"], isMalicious: false, teach: "This is a safe app. A simple calculator has no need for special permissions, which is a good sign." },
      { name: "PowerBoost.apk", signature: ["requests-contact-access","bg-connects-to-unknown-ip","disables-security-warnings"], isMalicious: true, teach: "Malicious. A battery saver that accesses contacts and disables security warnings is highly suspicious." },
      { name: "RealWeather.apk", signature: ["permission-location-access","connects-to-weather-api","no-invasive-permissions"], isMalicious: false, teach: "This app appears safe. It uses location data as expected for a weather app and connects to a known API." }
];