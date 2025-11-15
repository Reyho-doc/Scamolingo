export interface KnowYourScamsScenario {
  text: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  prevention: string[];
}

export const knowYourScamsData: KnowYourScamsScenario[] = [
  {
    text: "A full-screen form appears over your bank app asking for your PIN before continuing. The overlay looks identical to the real login.",
    options: ["Repackaging", "Overlay Attack", "SIM Swapping", "Reverse Engineering"],
    correctIndex: 1,
    explanation: "Overlay attacks display attacker-controlled screens on top of real apps to harvest credentials.",
    prevention: ["Use in-app protections", "Keep OS and apps updated", "Avoid granting extensive permissions"]
  },
  {
    text: "You install a 'theme keyboard' that later sends everything you type (passwords, OTPs) to a remote server.",
    options: ["Rogue Keyboard", "Mobile Phishing", "MITM", "Repackaging"],
    correctIndex: 0,
    explanation: "Rogue keyboards can capture typed data; only trust well-known keyboard apps and check permissions.",
    prevention: ["Review app permissions", "Use official app stores", "Limit keyboards with sensitive input"]
  },
  {
    text: "A 'bank helper' app on an unofficial market was made by modifying the real bank app and injecting malicious code.",
    options: ["SIM Swapping", "Mobile Trojan", "Overlay Attack", "Repackaging"],
    correctIndex: 3,
    explanation: "Repackaged apps are tampered versions of real apps that include malicious behaviour.",
    prevention: ["Distribute apps only via official stores", "Use app signature verification", "In-app anti-tamper"]
  },
  {
    text: "You click a short link in an SMS that opens a cloned bank sign-in page. After logging, your credentials are stolen.",
    options: ["Reverse Engineering", "SIM Swapping", "Mobile Phishing (Smishing)", "MITM"],
    correctIndex: 2,
    explanation: "Smishing sends SMS links to fake pages to steal credentials or payments.",
    prevention: ["Never open SMS links for banks", "Type URLs manually", "Use link scanners"]
  },
  {
    text: "A background app detects your banking app and silently modifies transactions to redirect funds.",
    options: ["Mobile Banking Trojan", "Overlay Attack", "Rogue Keyboard", "Repackaging"],
    correctIndex: 0,
    explanation: "Mobile banking trojans target banking apps to intercept or alter transactions.",
    prevention: ["Install anti-malware", "Restrict background permissions", "Monitor app behaviour"]
  },
  {
    text: "On public Wi-Fi, your communication with the bank is intercepted and altered by a third party.",
    options: ["SIM Swapping", "Man-in-the-Middle (MITM)", "Rogue Keyboard", "Repackaging"],
    correctIndex: 1,
    explanation: "MITM attacks intercept and can modify communications between you and the bank.",
    prevention: ["Avoid public Wi-Fi for sensitive tasks", "Use VPN", "Force HTTPS connections"]
  },
  {
    text: "You stop receiving SMS messages. Shortly after, a criminal logs into your accounts using SMS OTPs.",
    options: ["SIM Swapping", "Overlay Attack", "Reverse Engineering", "Rogue Keyboard"],
    correctIndex: 0,
    explanation: "SIM swap attackers convince carriers to move your number to their SIM to intercept OTPs.",
    prevention: ["Add carrier PIN", "Use authenticator apps", "Monitor carrier alerts"]
  },
  {
    text: "An attacker reverse engineers a bank's app to discover weak endpoints and publishes an exploit-targeting tool.",
    options: ["Mobile Phishing", "Reverse Engineering", "SIM Swapping", "Repackaging"],
    correctIndex: 1,
    explanation: "Reverse engineering is used to study app internals and find vulnerabilities that can be exploited.",
    prevention: ["Obfuscate code", "Use app shielding", "Security testing"]
  },
  {
    text: "A friend messages asking urgently for gift cards, but their replies seem rushed and odd.",
    options: ["Account Takeover", "Reverse Engineering", "Mobile Phishing", "Rogue Keyboard"],
    correctIndex: 0,
    explanation: "Real friend accounts often get hijacked to request money or gift cards; verify via call.",
    prevention: ["Call contacts to confirm", "Use multi-channel verification", "Enable login alerts"]
  },
  {
    text: "You are told to install an unofficial plugin for a popular finance app that claims to 'improve performance' but requests many permissions.",
    options: ["SIM Swapping", "Tampered Plugin", "Overlay Attack", "Mobile Phishing"],
    correctIndex: 1,
    explanation: "Tampered plugins can intercept API calls or inject behaviour — avoid unofficial plugins.",
    prevention: ["Use official extensions", "Review permissions", "Vendor checks"]
  },
  {
    text: "An email from a near-identical domain asks you to reauthenticate. The domain has one letter swapped (example: paypa1.com).",
    options: ["SIM Swapping", "MITM", "Typosquatting", "Rogue Keyboard"],
    correctIndex: 2,
    explanation: "Typosquatting domains mimic real sites and are used to phish credentials.",
    prevention: ["Carefully check domains", "Use bookmarks for banking websites", "Use link checkers"]
  },
  {
    text: "A short URL in a forum promises 'free credits' and redirects through multiple unknown domains before landing on a login page.",
    options: ["Obfuscated Phishing", "Reverse Engineering", "SIM Swapping", "Overlay Attack"],
    correctIndex: 0,
    explanation: "Redirect chains and short URLs are commonly used to obfuscate malicious destinations.",
    prevention: ["Use URL expanders", "Never log in after redirects", "Avoid obscure short links"]
  },
  {
    text: "You receive an unordered package from Amazon with a cheap item inside. A few days later, you see a glowing 5-star review for that item in your name.",
    options: ["Phishing", "Brushing Scam", "Repackaging", "Overlay Attack"],
    correctIndex: 1,
    explanation: "This is a Brushing Scam. Sellers send unsolicited items to create fake transactions, which then allows them to post fake positive reviews in your name to boost their product's rating.",
    prevention: ["Report the incident to the e-commerce platform", "You are not legally obligated to pay for unsolicited merchandise", "Change your account password"]
  },
  {
    text: "A friendly stranger starts a conversation on a messaging app, builds a strong friendship over several weeks, and then introduces you to a 'secret' and highly profitable crypto trading platform.",
    options: ["SIM Swapping", "Man-in-the-Middle", "Pig Butchering", "Reverse Engineering"],
    correctIndex: 2,
    explanation: "This is a Pig Butchering scam. It's a long-con where the scammer 'fattens up' the victim with trust and friendship before manipulating them into a fraudulent investment scheme.",
    prevention: ["Be wary of investment advice from strangers online", "Never use unofficial trading platforms", "If it sounds too good to be true, it is"]
  },
  {
    text: "A pop-up on your screen freezes your browser, stating your computer's files have been encrypted and will be deleted unless you pay a ransom in Bitcoin.",
    options: ["Ransomware", "Mobile Banking Trojan", "Formjacking", "Vishing"],
    correctIndex: 0,
    explanation: "This is a classic Ransomware attack. Malicious software encrypts your files, making them inaccessible, and demands payment for the decryption key. There's no guarantee paying will restore your files.",
    prevention: ["Regularly back up your data to an external drive", "Avoid suspicious downloads and links", "Keep your OS and antivirus updated"]
  },
  {
    text: "A 'fraud agent' from your bank calls to warn you about suspicious activity and asks you to confirm your identity by reading back your PIN and full account number over the phone.",
    options: ["Smishing", "Vishing (Voice Phishing)", "Quishing", "Malware"],
    correctIndex: 1,
    explanation: "This is Vishing, or Voice Phishing. Scammers use phone calls to impersonate trusted entities and trick people into revealing sensitive information. Your bank will never ask for your full PIN or password.",
    prevention: ["Hang up immediately", "Call your bank back using the official number from their website or your card", "Never provide passwords or PINs over the phone"]
  },
  {
    text: "You plug your phone into a public USB port at an airport to charge it, and a pop-up asks you to 'Trust this computer'. Shortly after, your data seems to have been compromised.",
    options: ["Juice Jacking", "SIM Swapping", "Brushing Scam", "Typosquatting"],
    correctIndex: 0,
    explanation: "This is Juice Jacking. Malicious actors can modify public USB ports to install malware on or steal data from connected devices. The 'Trust this computer' prompt is a key warning sign.",
    prevention: ["Use an AC power outlet with your own adapter", "Use a 'charge-only' USB cable or a data blocker", "Carry a portable power bank"]
  },
  {
    text: "The checkout page of an online store looks perfect, but malicious code hidden on the page is secretly capturing your credit card details as you type them in.",
    options: ["Overlay Attack", "Repackaging", "Formjacking", "MITM"],
    correctIndex: 2,
    explanation: "This is Formjacking (or a Magecart attack). Scammers inject malicious code into e-commerce sites to skim payment information from checkout forms in real-time, often without any visible signs of tampering.",
    prevention: ["Shop at reputable, well-known websites", "Use a credit card for better fraud protection", "Monitor your bank statements for suspicious charges"]
  }
];