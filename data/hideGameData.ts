export interface Task {
  id: string;
  name: string;
  description: string;
  timeCost: number;
  icon: string;
}

export interface Scam {
  id: string;
  title: string;
  description: string;
  requiredTasks: string[];
}

export const tasks: Task[] = [
  { id: 'VERIFY_SENDER', name: 'Verify Sender', description: 'Cross-checks the sender’s identity via another channel.', timeCost: 7, icon: '🧐' },
  { id: 'CALL_HOTLINE', name: 'Call Official Hotline', description: 'Hangs up and calls the official number on the company’s website.', timeCost: 6, icon: '📞' },
  { id: 'CHECK_FRIEND', name: 'Check on Friend', description: 'Calls your friend on their known number to verify an urgent request.', timeCost: 5, icon: '🗣️' },
  { id: 'INSPECT_LINK', name: 'Inspect Link', description: 'Hovers over or analyzes a link for signs of phishing before clicking.', timeCost: 5, icon: '🔗' },
  { id: 'USE_OFFICIAL_APP', name: 'Use Official App', description: 'Ignores messages and goes directly to the official app or website.', timeCost: 4, icon: '📲' },
  { id: 'UNINSTALL_APP', name: 'Uninstall Suspicious App', description: 'Removes a newly installed, suspicious app from your device.', timeCost: 6, icon: '🗑️' },
  { id: 'ENABLE_2FA', name: 'Enable 2FA', description: 'Adds two-factor authentication to your account.', timeCost: 8, icon: '📱' },
  { id: 'STRONG_PASSWORD', name: 'Use Strong Password', description: 'Creates a new, unique, and strong password.', timeCost: 7, icon: '🔑' },
  { id: 'PROTECT_OTP', name: 'Protect OTP/Codes', description: 'Refuses to share One-Time Passwords or verification codes.', timeCost: 3, icon: '🤫' },
  { id: 'UPDATE_DEVICE', name: 'Update Device', description: 'Installs the latest security updates on your phone/computer.', timeCost: 9, icon: '🔄' },
  { id: 'EMERGENCY_DISCONNECT', name: 'Emergency Disconnect', description: 'Immediately disconnects the device from the internet.', timeCost: 4, icon: '🔌' },
  { id: 'SPOT_RED_FLAGS', name: 'Spot Red Flags', description: 'Recognizes high-pressure tactics like urgency, fear, or greed.', timeCost: 4, icon: '🚩' },
  { id: 'REVIEW_BANK_STATEMENT', name: 'Review Bank Statement', description: 'Checks bank account for any unauthorized or suspicious charges.', timeCost: 5, icon: '🏦' },
  { id: 'FREEZE_ACCOUNTS', name: 'Freeze Accounts', description: 'Contacts banks to temporarily freeze accounts and cards.', timeCost: 8, icon: '🥶' },
  { id: 'REPORT_TO_PLATFORM', name: 'Report to Platform', description: 'Reports the scammer to the social media or marketplace admin.', timeCost: 5, icon: '📢' },
  { id: 'CHECK_DEVICE_PERMS', name: 'Check App Permissions', description: 'Reviews permissions for suspicious apps (e.g., SMS access).', timeCost: 6, icon: '🔬' },
];

export const scams: Scam[] = [
    {
        id: 'impersonation-police',
        title: 'Police Impersonation!',
        description: 'A "police officer" calls saying you have an outstanding fine and must pay immediately via bank transfer to avoid arrest.',
        requiredTasks: ['CALL_HOTLINE', 'SPOT_RED_FLAGS'],
    },
    {
        id: 'phishing-netflix',
        title: 'Streaming Service Phishing!',
        description: 'An email from "Netflix" says your payment failed. It asks you to update your billing details via a link: netflix-payment-update.com.',
        requiredTasks: ['INSPECT_LINK', 'USE_OFFICIAL_APP'],
    },
    {
        id: 'friend-in-need',
        title: 'Friend in Need!',
        description: 'Your friend\'s Facebook account messages you: "I\'m in an emergency and need you to send me $200. Please don\'t call, I lost my phone."',
        requiredTasks: ['CHECK_FRIEND', 'SPOT_RED_FLAGS'],
    },
    {
        id: 'otp-scam',
        title: 'OTP Theft!',
        description: 'A "bank agent" calls about a "fraudulent transaction". To stop it, they need you to read them the OTP code you just received.',
        requiredTasks: ['CALL_HOTLINE', 'PROTECT_OTP'],
    },
    {
        id: 'malware-app',
        title: 'Malware-Infected App!',
        description: 'You installed a "free game" but now your phone is slow and ads are popping up everywhere, even when the app is closed.',
        requiredTasks: ['UNINSTALL_APP', 'CHECK_DEVICE_PERMS'],
    },
    {
        id: 'account-takeover',
        title: 'Account Takeover!',
        description: 'You get an email saying someone logged into your email from another country. You realize you were reusing an old, leaked password.',
        requiredTasks: ['ENABLE_2FA', 'STRONG_PASSWORD'],
    },
    {
        id: 'subscription-scam',
        title: 'Fake Subscription Renewal!',
        description: 'You receive a renewal notice for a $299 "WebGuard Pro" subscription you don\'t remember buying. To cancel, you must call a number.',
        requiredTasks: ['CALL_HOTLINE', 'REVIEW_BANK_STATEMENT'],
    },
    {
        id: 'remote-access-scam',
        title: 'Remote Access Scam!',
        description: 'A "Tech Support" agent on the phone has convinced you to install TeamViewer so they can "fix" a non-existent virus on your computer.',
        requiredTasks: ['EMERGENCY_DISCONNECT', 'UNINSTALL_APP'],
    },
    {
        id: 'ceo-impersonation',
        title: 'CEO Gift Card Scam!',
        description: 'Your "boss" emails you late on a Friday: "I need you to urgently buy five $100 gift cards for a client and send me the codes. I\'ll reimburse you Monday."',
        requiredTasks: ['VERIFY_SENDER', 'SPOT_RED_FLAGS'],
    },
    {
        id: 'delivery-phishing',
        title: 'Customs Fee Phishing!',
        description: 'You get an SMS about a parcel held at customs. A "small fee" is required to release it. The link provided asks for your credit card details.',
        requiredTasks: ['INSPECT_LINK', 'USE_OFFICIAL_APP'],
    },
    {
        id: 'sim-swap',
        title: 'SIM Swap Attack!',
        description: 'Your phone suddenly loses signal for no reason. Soon after, you get alerts about password resets on your main accounts.',
        requiredTasks: ['CALL_HOTLINE', 'FREEZE_ACCOUNTS'],
    },
    {
        id: 'romance-scam',
        title: 'Romance Scam Emergency!',
        description: 'An online partner you\'ve never met in person suddenly has a medical emergency and needs you to send money for surgery.',
        requiredTasks: ['SPOT_RED_FLAGS', 'REPORT_TO_PLATFORM'],
    },
    {
        id: 'marketplace-overpayment',
        title: 'Marketplace Overpayment!',
        description: 'A buyer "accidentally" overpays for your item and asks you to refund the difference via bank transfer. Their initial payment will bounce.',
        requiredTasks: ['REPORT_TO_PLATFORM', 'SPOT_RED_FLAGS'],
    },
    {
        id: 'quishing',
        title: 'QR Code Phishing!',
        description: 'You scan a QR code on a poster for a "discount" which takes you to a site asking for your social media login to claim the offer.',
        requiredTasks: ['INSPECT_LINK', 'USE_OFFICIAL_APP'],
    },
    {
        id: 'sms-forwarding-malware',
        title: 'SMS Forwarding Malware!',
        description: 'A new "battery saver" app you installed is secretly forwarding all your SMS messages, including bank OTPs, to a scammer.',
        requiredTasks: ['UNINSTALL_APP', 'CHECK_DEVICE_PERMS'],
    },
    {
        id: 'pig-butchering',
        title: 'Pig Butchering Scam!',
        description: 'An online friend you\'ve been talking to for weeks shows you their "amazing" profits from a crypto site and urges you to invest.',
        requiredTasks: ['SPOT_RED_FLAGS', 'VERIFY_SENDER'],
    },
    {
        id: 'sextortion-scam',
        title: 'Sextortion Scam!',
        description: 'An email arrives with one of your old passwords in the subject line, claiming to have webcam footage of you and demanding crypto payment.',
        requiredTasks: ['STRONG_PASSWORD', 'SPOT_RED_FLAGS'],
    },
];