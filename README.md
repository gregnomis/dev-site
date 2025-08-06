# Greg Simon's Developer Portfolio

A modern, responsive portfolio website showcasing my projects and skills as a full-stack developer.

## 🚀 Features

- React with Vite for blazing-fast performance
- Responsive design with mobile optimization
- Dark/light theme switching
- Interactive Lottie animations
- Project showcase with detailed information
- Backend server for code analysis
- Service worker for offline capabilities

## 🛠️ Tech Stack

- **Frontend**: React, Vite, CSS3
- **Animations**: Lottie
- **Backend**: Express, Node.js
- **Build Tools**: Vite, ESLint
- **Deployment**: Static hosting with Express backend

## 📋 Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/devsite.git
   cd devsite
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Variables**
   - Copy `.env.example` to `.env`
   ```bash
   cp .env.example .env
   ```
   - Edit `.env` with your specific configuration values

4. **Development**
   ```bash
   npm run dev
   ```
   This starts both the frontend (Vite) and backend (Express) servers.

5. **Build for production**
   ```bash
   npm run build
   ```

6. **Start production server**
   ```bash
   npm start
   ```

## 📁 Project Structure

- `/public` - Static assets and service worker
- `/src` - React application source code
  - `/assets` - Images, lotties, and other media
  - `/components` - React components
  - `/config` - Project configuration files
  - `/context` - React context providers
  - `/hooks` - Custom React hooks
  - `/utils` - Utility functions
- `/server` - Backend Express server for code analysis

## 🔧 Configuration

The application uses environment variables for configuration. See `.env.example` for all required variables.

## 📱 Mobile Support

The application is fully responsive and tested on various mobile devices. CSS breakpoints are used to ensure a smooth experience on all screen sizes.
