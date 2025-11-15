export interface MissionObjective {
  type: 'analyze' | 'trace' | 'domain' | 'app' | 'botnet';
  id?: number;
  _done?: boolean;
}

export interface Mission {
  title: string;
  objectives: MissionObjective[];
  reward: number;
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

export const MISSIONS: Mission[] = [
    {
      title: "Local Phishing Ring",
      objectives: [
        { type: "analyze", id: 0 },
        { type: "trace" },
        { type: "domain" },
        { type: "botnet" }
      ],
      reward: 40
    },
    {
      title: "Repackager Syndicate",
      objectives: [
        { type: "analyze", id: 1 },
        { type: "app" },
        { type: "trace" },
        { type: "botnet" }
      ],
      reward: 60
    },
    {
      title: "International Scam Cartel",
      objectives: [
        { type: "analyze", id: 2 },
        { type: "domain" },
        { type: "app" },
        { type: "trace" },
        { type: "botnet" }
      ],
      reward: 120
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
      ]
    },
    {
      from: "bank-secure@safebank.com",
      subject: "Update required: secure your account",
      preview: "We detected suspicious activity. Click link to re-authenticate: hxxp://safebank-login.com",
      type: "repackaging",
      correct: "Repackaging / Phishing",
      teach: "Phishing pages use look-alike domains. Never click; instead visit the official site or app, and check certificate/URL carefully.",
      incorrectFeedback: [
          { option: "Mobile Phishing (Smishing)", feedback: "Incorrect. While this is phishing, the term 'Smishing' specifically refers to phishing attacks delivered via SMS (text message)." },
          { option: "Rogue Keyboard", feedback: "Incorrect. This attack doesn't involve installing a malicious keyboard; it's focused on getting you to visit a fake website." },
          { option: "Man-in-the-Middle", feedback: "Incorrect. This is a direct phishing attempt, not an interception of existing network traffic." }
      ]
    },
    {
      from: "update@coolkeyboard.app",
      subject: "Mandatory update: improve typing performance",
      preview: "Install this keyboard to get themes and special emoji pack. It asks for full keyboard access.",
      type: "roguekeyboard",
      correct: "Rogue Keyboard",
      teach: "Rogue keyboards can capture all typed input. Only install trusted keyboards and review permissions.",
      incorrectFeedback: [
          { option: "Mobile Phishing (Smishing)", feedback: "Incorrect. Phishing and Smishing use deceptive links to steal credentials. This scam involves installing malicious software." },
          { option: "Repackaging / Phishing", feedback: "Incorrect. 'Repackaging' involves modifying an existing app. While similar, a 'Rogue Keyboard' is a distinct type of malicious app built from the ground up to steal keystrokes." },
          { option: "Man-in-the-Middle", feedback: "Incorrect. The threat here is the malicious app itself, not an interception of your network data." }
      ]
    }
];

export const SHOP_ITEMS: ShopItem[] = [
    { id: "scan", name: "Scanner Upgrade", cost: 30, desc: "Speed up analysis & increase rep gain", apply: (tools) => ({...tools, scannerLevel: tools.scannerLevel + 1}) },
    { id: "trace", name: "Trace Suite", cost: 40, desc: "Improve tracing reliability", apply: (tools) => ({...tools, traceLevel: tools.traceLevel + 1}) },
    { id: "domain", name: "Domain AI", cost: 35, desc: "Better fuzzy detection of typosquatting", apply: (tools) => ({...tools, domainLevel: tools.domainLevel + 1}) },
    { id: "bot", name: "Botnet Toolkit", cost: 50, desc: "Faster botnet takedown", apply: (tools) => ({...tools, botnetTools: tools.botnetTools + 1}) }
];

export const APP_POOL: AppProfile[] = [
      { name: "CoolKeyboard.apk", signature: ["full-keyboard-access","sends-keystrokes-http","clipboard-read"], isMalicious: true, teach: "This is a Rogue Keyboard. The signature 'sends-keystrokes-http' is a major red flag for data theft." },
      { name: "BankFast_Official.apk", signature: ["signature-valid","api-usage-normal","no-overlay-permission"], isMalicious: false, teach: "This appears to be a legitimate app with a valid signature and normal behavior." },
      { name: "PayHelper-MOD.apk", signature: ["signature-mismatch","dex-injection","overlay-service-active"], isMalicious: true, teach: "This is a Repackaged Trojan. The 'signature-mismatch' and 'overlay-service-active' flags indicate tampering to steal credentials." },
      { name: "PhotoEditPlus.apk", signature: ["permission-storage-access","ads-sdk-integrated","no-network-bg-activity"], isMalicious: false, teach: "This app seems safe. While it has ads, it doesn't exhibit suspicious background network activity." }
];