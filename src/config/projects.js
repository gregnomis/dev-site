import { images } from './images';

export const projects = {
  LockChain: {
    title: '🔐 LockChain',
    subtitle: 'Tamper-proof file & data authentication, verified by Bitcoin\'s immutable ledger.',
    role: 'Founder & Developer (Full-Stack, Mobile, Product)',
    website: 'https://www.lockchain.ca/qr',
    platform: 'Android (Kotlin), Firebase, Bitcoin blockchain + OP_RETURN scripts',
    stack: 'Kotlin, Firebase, Google Cloud Functions (migrated from AWS EC2), Node.js, Stripe API, Mempool API, Google Play Billing',
    backend: 'RESTful APIs, Firebase Auth, Cloud Storage, Realtime Database',
    features: [
      'SHA-256 file hashing & verification',
      'Bitcoin wallet generation & key management',
      'Blockchain-backed identity',
      'File hash anchoring',
      'Dynamic BTC fee calculation',
      'In-app purchases',
      'Lottie animations for interactive UI, responsiveness and smooth transitions'
    ],
    logo: images.logoLockchain,
    playStoreLink: 'https://play.google.com/store/apps/details?id=com.lockchainapp.lockchain'
  },
  AiQArt: {
    title: '🎨 AiQArt',
    subtitle: 'AiQArt transforms traditional QR codes into unique pieces of generative art. It blends real-time QR encoding with AI-driven image generation to create visually stunning codes for personal, branding, or creative use.',
    role: 'Founder & Developer (Full-Stack, AI Integration, Mobile & Web UX)',
    website: 'https://www.lockchain.ca/ai',
    platform: 'Android (Kotlin), Web (Wix), Firebase, Google Cloud, Gooey.AI + Stability AI',
    stack: 'Kotlin, Retrofit2, OkHttp, Firebase, Firestore, Cloud Functions, Mempool API',
    backend: 'Firebase Auth, Firestore, Cloud Storage, Stripe (Credits System)',
    logo: images.logoAiqart,
    features: [
      'Two-model AI pipeline: Gooey.AI for prompt-based QR art generation, Stability AI for high-resolution upscaling',
      'Real-time QR code encoding embedded within the generated artwork',
      'Fully functional on both Android and web application',
      'Dynamic credit-based system managed through Firestore and Stripe',
      'Custom Retrofit converter to handle mixed API responses (JSON or string)',
      'Download-ready images saved locally with Android media scanner support',
      'Clean, user-friendly UI built for smooth mobile and web interactions'
    ],
    playStoreLink: 'https://play.google.com/store/apps/details?id=com.lockchainapp.aiqart'
  },
    SolMate: {
    title: '🤖 Solmate',
    subtitle: 'Telegram-native Solana wallet bot, with encrypted key storage and real-time SOL transfers with simple chat commands.',
    role: 'Developer (Bot Dev, Solana, Full-Stack Python/TypeScript)',
    website: 'https://t.me/SolmateWalletBot',
    platform: 'Telegram Bot, Solana mainnet, PocketBase, Python + TypeScript CLI',
    stack: 'Python, Telegram Bot API, httpx, PocketBase, Solana Web3.js, TypeScript, Rust, Anchor, yargs',
    backend: 'PocketBase (user records and encrypted keys), TypeScript CLI for transaction signing, Solana JSON-RPC, deployment through persistent live tmux session on dedicated VPS.',
    features: [
      'Deterministic Solana wallet generation from 12-word mnemonic',
      'SHA-256 encryption of private keys before database storage',
      'Automatic wallet creation and balance display on /start',
      'Command-based tipping with /send @username amount',
      'TypeScript CLI for secure, fee-aware SOL transfers',
      'Withdraw flow with confirmation and send-all option',
      'Real-time transaction fee calculation using getFeeForMessage',
      'Clean Markdown-formatted Telegram UI with inline keyboards',
      'Self-hosted backend with live bot uptime managed through tmux',
      'Previously deployed on Solana Devnet with its own SPL token and custom Anchor smart contract for automatic reward distribution and tax logic'
    ],
    logo: images.logoSolmate,
    telegramLink: 'https://t.me/SolmateWalletBot'
  }
};
