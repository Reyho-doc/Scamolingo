export interface GameScenario {
  id: number;
  type: 'SMS' | 'Email' | 'Social Media' | 'Pop-up';
  sender?: string;
  subject?: string;
  scenario: string;
  isScam: boolean;
  explanation: string;
}

export const gameScenarios: GameScenario[] = [
  {
    id: 1,
    type: 'SMS',
    sender: 'DPD-UK',
    scenario: "Your parcel has a £2.99 shipping fee, to pay this visit: dpd.reschedule-payment.com. If you do not pay, your parcel will be returned to sender.",
    isScam: true,
    explanation: "This is a smishing (SMS phishing) scam. The URL is not the official DPD website, and legitimate delivery companies usually don't ask for small payments via a text link. The threat of returning the parcel creates false urgency."
  },
  {
    id: 2,
    type: 'Email',
    sender: 'HR Department',
    subject: 'URGENT: Exciting Remote Job Opportunity!',
    scenario: "Hi, We are impressed with your profile on LinkedIn and have an immediate opening for a 'Data Annotator'. The pay is $75/hour. No interview needed. To proceed, please purchase the required software for $150 via the link below. You will be reimbursed in your first paycheck. Click here: secure-software-portal.net",
    isScam: true,
    explanation: "This is a fake job offer scam. Legitimate employers will not ask you to pay for equipment or software upfront. The high pay, lack of an interview, and the reimbursement promise are all major red flags."
  },
  {
    id: 3,
    type: 'SMS',
    sender: 'Google',
    scenario: "You just tried to log in from a new device. Your Google verification code is 845192. Don't share it with anyone.",
    isScam: false,
    explanation: "This is a legitimate two-factor authentication (2FA) message. It's concise, provides the code, and includes a security warning not to share it. You would typically receive this right after trying to log in somewhere."
  },
  {
    id: 4,
    type: 'Social Media',
    sender: 'An old friend',
    scenario: "Hey! So sorry to message you like this but I'm in a real jam. My wallet was stolen and I'm stuck abroad. Can you please send me $200 so I can get a flight home? I'll pay you back as soon as I land. It's an emergency!",
    isScam: true,
    explanation: "This is a personal impersonation scam. Scammers hijack social media accounts and message friends with a dramatic story to create urgency and sympathy. Always verify such requests by calling your friend on their known phone number."
  },
  {
    id: 5,
    type: 'Pop-up',
    sender: 'System Security Warning',
    scenario: "**WARNING: Your Computer is Infected!**\nThreat Detected: Trojan.SPY.Agent.cq\nCall Microsoft Support Immediately at 1-800-555-0199 to prevent data loss. Do not close this window.",
    isScam: true,
    explanation: "This is a tech support scam. Microsoft and other tech companies do not send security warnings through browser pop-ups that demand you call a phone number. The goal is to get you on the phone so they can gain remote access to your computer and charge you for fake services."
  },
  {
    id: 6,
    type: 'SMS',
    sender: 'Courier Service',
    scenario: "Hi Jane, your package with tracking #ZA945... is held at customs. A £3.50 import fee is required for release. Please pay at: uk-customs-release.com to avoid return.",
    isScam: true,
    explanation: "This is a highly targeted smishing scam. The use of a real name and tracking number format makes it look convincing, but the URL is not an official government or courier site. They aim to steal your card details for a small, believable fee."
  },
  {
    id: 7,
    type: 'SMS',
    sender: 'Bank Security',
    scenario: "URGENT: A suspicious login was detected on your account. A security agent will call you shortly to verify. Please provide them with the one-time password (OTP) we just sent you to secure your account.",
    isScam: true,
    explanation: "This is a classic impersonation scam. Your bank will NEVER call you or ask you to provide your OTP. Scammers create a sense of panic to make you comply. The call is from them, and giving them the OTP grants them full access."
  },
  {
    id: 8,
    type: 'Email',
    sender: 'IT Department',
    subject: 'Action Required: New Secure Login System Test',
    scenario: "Team, we are rolling out a new secure login system. As part of the final test phase, please log in with your current credentials at the link below to ensure compatibility: [link to company.secure-login-test.com]",
    isScam: true,
    explanation: "This is a sophisticated phishing email. It uses perfect company branding and a believable pretext. The link leads to a fake portal designed to harvest your login credentials, giving scammers access to the company network."
  },
  {
    id: 9,
    type: 'Social Media',
    sender: 'A Stranger',
    scenario: "Hey, saw your profile. I've been making a killing on XYZ stock because of the recent news about their new product. You should get in now before it explodes! I'm using this new platform, it's great.",
    isScam: true,
    explanation: "This is a 'pump-and-dump' or investment scam. The scammer builds credibility by referencing real news, but their goal is to get you to sign up for a fraudulent trading platform or to artificially inflate a stock's price before they sell their shares."
  },
  {
    id: 10,
    type: 'Social Media',
    sender: 'Your Sibling',
    scenario: "(Voice message) 'Hey, it's me! I'm in trouble, lost my phone and wallet. I'm using a friend's phone. Can you transfer money to this account number really quick? I'll explain later, it's an emergency!' The voice sounds like them but a bit distorted.",
    isScam: true,
    explanation: "This is an AI deepfake voice scam. Scammers use AI to clone a person's voice from just a few seconds of audio found online. The slight distortion is a red flag. Always verify such requests with a callback to their known number or by asking a personal question only they would know."
  },
  {
    id: 11,
    type: 'Email',
    sender: 'Your Bank',
    subject: 'Notification of Subscription Charge',
    scenario: "Dear customer, a charge of $8.99 for your streaming service subscription has been processed. If you did not authorize this, please click here to dispute the charge immediately.",
    isScam: true,
    explanation: "This is a phishing scam. The small, common charge amount is designed not to alarm you, but to make you click the link out of confusion. The link leads to a fake banking portal to steal your login details."
  },
  {
    id: 12,
    type: 'Email',
    sender: 'Recruiter',
    subject: 'Next Step: Technical Setup for Interview',
    scenario: "Thanks for your interest. Before our Zoom interview, you must install our proprietary 'security plugin' to ensure a secure connection. Please download it from [link to malware-site.com].",
    isScam: true,
    explanation: "This is a job scam aimed at installing malware on your device. Legitimate companies use standard platforms and will never require you to install unknown software for an interview. The 'plugin' is likely spyware or ransomware."
  },
  {
    id: 13,
    type: 'Social Media',
    sender: 'Marketplace Seller',
    scenario: "Yes, the item is still available! Here are some real-time photos and a video. To reserve it, please send a 50% deposit via bank transfer. I have lots of other buyers interested.",
    isScam: true,
    explanation: "This is a common marketplace scam. Scammers create high-pressure sales tactics ('other buyers') to rush you into paying a deposit. Once the deposit is paid, they will disappear. Always transact in person or use the platform's official payment system."
  },
  {
    id: 14,
    type: 'Email',
    sender: 'Well-Known Charity',
    subject: 'Help Us Make a Difference',
    scenario: "Help support our cause! We are a registered charity (Reg. #123456). Please donate via the link below to help those in need. [link to a personal payment page]",
    isScam: true,
    explanation: "This is a charity scam. The scammer uses the name and registration number of a real charity to appear legitimate, but the payment link directs funds to a personal account instead of the charity's official donation portal. Always donate directly on the charity's known website."
  },
  {
    id: 15,
    type: 'Pop-up',
    sender: 'Cafe Wi-Fi',
    scenario: "Welcome to 'The Coffee Spot' Wi-Fi! To connect, please log in with your Google account to authenticate and accept our terms of service.",
    isScam: true,
    explanation: "This is a 'captive portal' phishing attack. Legitimate free Wi-Fi networks may have a splash page, but they rarely require you to log in with a sensitive account like Google or Facebook. This is a trick to steal your password."
  },
  {
    id: 16,
    type: 'Email',
    sender: 'Unknown Hacker',
    subject: 'I know your password',
    scenario: "I have your password: [an old password of yours]. I've installed malware on your device and have recorded you visiting adult websites. Send $500 in Bitcoin to this address in 24 hours, or I will send the video to all your contacts.",
    isScam: true,
    explanation: "This is a sextortion scam. The scammers get your old password from a past data breach. They have no video and are bluffing. The goal is to scare you into paying. Do not pay, and change your passwords."
  },
  {
    id: 17,
    type: 'SMS',
    sender: 'Returns Dept.',
    scenario: "You have received an unexpected package. If this is not yours, please call our returns department at 1-800-FAKE-NUMB to arrange a pickup and refund.",
    isScam: true,
    explanation: "This is a vishing (voice phishing) scam. The goal is to get you on the phone with a scammer who will impersonate a returns department to steal your personal and financial information under the guise of processing a 'return'."
  },
  {
    id: 18,
    type: 'Social Media',
    sender: 'A close friend',
    scenario: "Hey can you do me a huge favor? I'm trying to buy a birthday present for my niece but my card isn't working online. Could you buy a $100 Google Play gift card and send me the code? I'll pay you back tonight!",
    isScam: true,
    explanation: "This is a classic account takeover scam. Your friend's account has been hacked. Scammers ask for gift cards because they are untraceable. Always verify such requests through a different communication method, like a phone call."
  },
  {
    id: 19,
    type: 'Social Media',
    sender: 'Investment Group',
    scenario: "You've been added to 'Crypto Winners Circle'. The group is full of people sharing screenshots of huge profits from a new trading platform. The 'guru' admin is urging everyone to sign up and deposit funds.",
    isScam: true,
    explanation: "This is an investment scam. The group is filled with bots and accomplices creating a fake sense of success. The trading platform is fake, and any money you deposit will be stolen."
  },
  {
    id: 20,
    type: 'SMS',
    sender: 'Courier Payments',
    scenario: "There was an error processing the payment on delivery. Please re-enter your card details at this secure link to finalize the transaction for your package: [link to fake-payment-portal.com]",
    isScam: true,
    explanation: "This scam preys on the confusion of a recent delivery. Legitimate companies will have established procedures for payment errors, not an immediate text with a suspicious link to a non-official website."
  },
  {
    id: 21,
    type: 'SMS',
    sender: 'Bank Fraud Alerts',
    scenario: "Fraud Alert: Did you use card ending in 1234 for $150.80 at BEST BUY on 05/20? Reply YES or NO. We will NOT ask for your card number or personal info.",
    isScam: false,
    explanation: "This is a legitimate fraud alert. Banks use these systems to quickly verify transactions. Crucially, they state they will NOT ask for personal information and only require a simple YES/NO response."
  },
  {
    id: 22,
    type: 'Email',
    sender: 'Microsoft Account Team',
    subject: 'Microsoft account password reset',
    scenario: "You just requested a password reset for your Microsoft account. We received this request and have sent you this link to proceed. If you didn't make this request, you can safely ignore this email.",
    isScam: false,
    explanation: "This is a legitimate password reset email. Key signs are that it references an action you just took, it doesn't demand immediate action if you *didn't* request it, and the link (if hovered over) would go to a real Microsoft domain."
  },
  {
    id: 23,
    type: 'Email',
    sender: 'Steam',
    subject: '🔥 The Steam Summer Sale is on NOW! 🔥',
    scenario: "Don't miss out! Get up to 90% off on thousands of titles during the Steam Summer Sale. Your wishlist is on sale! This offer ends soon, so act fast!",
    isScam: false,
    explanation: "While this email uses urgency ('Don't miss out!', 'ends soon'), it's a common marketing tactic from a legitimate company. The key is to verify the sender and go directly to the official Steam website or app to shop, rather than clicking links in the email if you're ever unsure."
  },
  {
    id: 24,
    type: 'SMS',
    sender: 'Dr. Smith\'s Office',
    scenario: "You have an appointment scheduled with our office. This is a reminder of your appointment with Dr. Smith on Tuesday, May 21st at 10:30 AM. Please reply C to confirm or call 555-123-4567 to reschedule.",
    isScam: false,
    explanation: "This is a standard, legitimate appointment reminder. It references a prior action (scheduling an appointment), provides clear information, multiple options, and a verifiable phone number. It doesn't ask for money or personal data."
  },
  {
    id: 25,
    type: 'Email',
    sender: 'Amazon.com',
    subject: 'Your Amazon.com order of "Smart Home Hub"',
    scenario: "You just purchased a 'Smart Home Hub' on Amazon. Hello John, thank you for your order. We'll let you know when it ships. View order details or manage your order on Amazon.com.",
    isScam: false,
    explanation: "This is a standard order confirmation. It references a specific item you just ordered and directs you to the official website to manage it, rather than using suspicious links. There's no unexpected urgency or request for information."
  },
  {
    id: 26,
    type: 'Social Media',
    sender: 'A new connection',
    scenario: "We've only known each other a week, but I feel a real connection. My mother just had a medical emergency and I'm short on funds for her surgery. Could you please help me? I'm desperate and have no one else to turn to.",
    isScam: true,
    explanation: "This is a classic romance scam. Scammers build a quick, intense emotional connection and then invent a sudden emergency requiring money. The pressure to act out of sympathy is a major red flag."
  },
  {
    id: 27,
    type: 'Email',
    sender: 'Your CEO',
    subject: 'URGENT & CONFIDENTIAL',
    scenario: "I'm in a conference and can't take calls. I need you to urgently purchase ten $100 Apple gift cards for a client presentation. Scratch off the backs and email me the codes immediately. I will reimburse you. This is time-sensitive.",
    isScam: true,
    explanation: "This is a CEO impersonation scam. It combines authority and urgency to bypass normal procedures. The request for gift cards is a huge red flag as they are untraceable, like cash."
  },
  {
    id: 28,
    type: 'Email',
    sender: 'Vendor Accounts Dept.',
    subject: 'Invoice #582-B Payment Update',
    scenario: "Dear partner, please note that we have updated our banking details. For all future payments, including the attached invoice, please use the new account information provided in the PDF. Thank you for your cooperation.",
    isScam: true,
    explanation: "This is a fake invoice or Business Email Compromise (BEC) scam. Scammers impersonate a real vendor and trick you into sending payment to their account. Always verbally confirm any change in payment details with your known contact at the company."
  },
  {
    id: 29,
    type: 'Social Media',
    sender: 'Local Community Group',
    scenario: "Message from a stranger after you posted about your lost cat: 'Hi, I think I found your cat! It looks just like the picture. There's a small rehoming fee from the shelter I found it at. Can you send $50 to cover it and I'll send you the address?'",
    isScam: true,
    explanation: "This is a lost pet scam. Scammers prey on the emotions of worried pet owners. Legitimate finders or shelters will not ask for a fee upfront via a messaging app. Always arrange to meet in a public place first."
  },
  {
    id: 30,
    type: 'Email',
    sender: 'Norton Security',
    subject: 'Your subscription has been renewed!',
    scenario: "Dear customer, your Norton Antivirus subscription has been auto-renewed for $399.99. This charge will appear on your statement within 24 hours. If you did not authorize this and wish to cancel, call our billing department at 1-800-FAKE-NUM.",
    isScam: true,
    explanation: "This is a refund scam. The high price is meant to shock you into calling the number. Once on the phone, the 'billing department' will try to get remote access to your computer to 'process the refund', but will actually steal your banking information."
  },
  {
    id: 31,
    type: 'Social Media',
    sender: 'Task-Based Job Ad',
    scenario: "Earn $200/day! We're hiring 'product reviewers'. Your task is to deposit small amounts of money to 'boost' product rankings. You'll get your deposit back plus a 10% commission on each task.",
    isScam: true,
    explanation: "This is a task-based job scam. You might get a small payout initially to build trust, but soon you'll be asked for larger deposits which you will never get back. Legitimate jobs never require you to use your own money."
  },
  {
    id: 32,
    type: 'Pop-up',
    sender: 'Public Parking QR',
    scenario: "You park your car and see a new QR code sticker on the meter. It says 'Conveniently pay for parking here!'. Scanning it takes you to a sleek-looking payment portal.",
    isScam: true,
    explanation: "This is a QR Code Phishing (Quishing) scam. Scammers place fake QR stickers over real ones. The fake portal is designed to steal your credit card information. Always be cautious when scanning public QR codes."
  },
  {
    id: 33,
    type: 'Email',
    sender: 'Your Bank',
    subject: 'Important: Please confirm your new payee request',
    scenario: "Dear Customer, a new payee 'John Smith' was added to your account. If you did not authorize this, please click the link below to cancel the request immediately: [link to your-bank.security.com]",
    isScam: true,
    explanation: "This is a phishing scam. The link looks convincing but is a fake domain. The urgency of an unauthorized payee is designed to make you panic and click without thinking. Always go to your bank's official website or app manually."
  },
  {
    id: 34,
    type: 'SMS',
    sender: 'Tax Services',
    scenario: "You are eligible for a tax refund of $450.25. To receive your funds, please verify your identity and banking information at: [link to tax-refund-gov-portal.com]",
    isScam: true,
    explanation: "Government tax agencies will never contact you via SMS or email to ask for personal information for a refund. They communicate through official mail or their secure government portals which you should access directly."
  },
  {
    id: 35,
    type: 'Email',
    sender: 'Google',
    subject: 'Security alert for your linked account',
    scenario: "A new sign-in to your Google Account was detected on a Windows device. If this was you, you don't need to do anything. If not, we'll help you secure your account. Check activity at accounts.google.com.",
    isScam: false,
    explanation: "This is a legitimate security alert from Google. The key signs are the lack of panic-inducing language, clear information, and directing you to the official, recognizable domain (accounts.google.com) without hiding it behind a hyperlink."
  },
  {
    id: 36,
    type: 'Social Media',
    sender: 'Video Call from Mom',
    scenario: "You get a video call from your mom. It looks and sounds like her, but the video is a bit laggy. She says she's been in an accident and needs you to send money to a specific account for hospital fees immediately.",
    isScam: true,
    explanation: "This is a deepfake scam. AI can now convincingly mimic a person's face and voice in real-time. The slight lag or unnatural movements are a red flag. Always verify such emergencies by hanging up and calling her back on her known number, or using a pre-arranged family 'safe word'."
  },
  {
    id: 37,
    type: 'Pop-up',
    sender: 'Website Prize',
    scenario: "CONGRATULATIONS! You are today's lucky visitor! You have been selected to win a free iPhone 15. To claim your prize, please complete this short survey and enter your shipping details.",
    isScam: true,
    explanation: "This is an information harvesting scam. There is no prize. The 'survey' is designed to collect your personal data (name, address, phone number) which is then sold to marketers or other scammers. It may also lead to a request for a 'shipping fee', stealing your card details."
  },
  {
    id: 38,
    type: 'SMS',
    sender: 'Your Utility Provider',
    scenario: "Final notice: Your electricity will be disconnected in 30 minutes due to an unpaid bill. To avoid service interruption, pay immediately at: [link to quick-pay-utilities.com]",
    isScam: true,
    explanation: "This scam uses extreme urgency and fear. Utility companies have a formal, multi-stage process for disconnections and will not threaten you via a single text with a 30-minute deadline. The link is a fake payment portal."
  },
  {
    id: 39,
    type: 'Email',
    sender: 'HR Department',
    subject: 'Updated Employee Handbook & Policy Changes',
    scenario: "Please find the updated Q3 Employee Handbook attached. You are required to read it and acknowledge the new policies by the end of the week. The document is password-protected for security; please enable macros to view the content.",
    isScam: true,
    explanation: "This is a phishing attempt using a malicious document. The instruction to 'enable macros' is a huge red flag, as this allows hidden code (malware or ransomware) to run on your computer. Legitimate documents shouldn't require this step."
  },
  {
    id: 40,
    type: 'Social Media',
    sender: 'Celebrity Giveaway',
    scenario: "A verified celebrity account posts: 'I'm giving away $10,000 in Bitcoin! To participate, just send 0.1 BTC to this address, and I will send you 0.2 BTC back! Doing this for the first 1000 people!'",
    isScam: true,
    explanation: "This is an advance-fee scam, often spread through hacked celebrity accounts. No legitimate giveaway will ever require you to send money or crypto first. Any funds you send will be stolen."
  }
];