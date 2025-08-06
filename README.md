# Greg Simon's Developer Portfolio

A simple dev site to showcase your projects with easy server-side API calls to analyze your project files. This modern, responsive portfolio website includes a backend component that connects to locally hosted repositories through API calls, allowing for real-time code analysis and statistics.

Even though the site and repositories are hosted on the same server, the frontend React app cannot access the file system directly due to browser security restrictions. That’s why a backend Express API is used to securely perform local file access, run code analysis (via tools like tokei), and return the stats to the frontend over HTTP.

However, keep in mind that setting up and running your own server can be risky if you’re not familiar with server hardening, firewall rules, or secure API design — especially if you’re hosting sensitive files without locking down your config or endpoints properly. In this project, all API endpoints are hosted locally on the same server and only accessible through Nginx reverse proxy (typically via /api/... routes). They are not publicly exposed, and even if discovered, the responses only contain non-sensitive code statistics (e.g. tokei JSON dumps) that may reference generic server paths like /opt/..., but nothing private or executable. Most importantly, the tokei response doesn't detail the code within fragments or files of the scanned project repo, only statistics like language, code count, comments, etc.

Lastly, I originally built this project for personal use and didn’t plan on open-sourcing it. So if you decide to clone or fork it, just be aware that you’ll need to swap out a number of hardcoded variables like project names, titles, and descriptions. Sorry in advance!

## 🚀 Features

- React with Vite for blazing-fast performance
- Responsive design with mobile optimization
- Dark/light theme switching
- Interactive Lottie animations
- Project showcase with detailed information
- Backend server for code analysis of local repositories
- Server-side API for processing repository data through nginx proxy
- Code statistics and analytics integration
- Service worker for offline capabilities

## 🛠️ Tech Stack

- **Frontend**: React, Vite, CSS3
- **Animations**: Lottie
- **Backend**: Express, Node.js
- **Code Analysis**: tokei (for code statistics)
- **Build Tools**: Vite, ESLint
- **Deployment**: Static hosting with Express backend behind nginx proxy
- **Server Architecture**: Local repositories accessed via server-side APIs

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
  - `analyzeServer.js` - Main server that handles API requests
  - `analyzeRepo.js` - Utilities for analyzing local repositories

## 🔧 Configuration

The application uses environment variables for configuration. See `.env.example` for all required variables.

## 🖥️ Server Setup

This application is designed to work with local repositories stored on the same server where the website is hosted:

1. **Local Repository Access**: The backend server accesses local repositories specified in environment variables.

2. **Nginx Proxy Setup**: In production, all traffic should be proxied through Nginx to your Express backend. A minimal secure example is:
   ```nginx
   server {
       listen 443 ssl;
       server_name yourdomain.com;

       ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
       ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;

       # Security Headers
       add_header X-Frame-Options DENY;
       add_header X-Content-Type-Options nosniff;
       add_header X-XSS-Protection "1; mode=block";
       add_header Referrer-Policy no-referrer-when-downgrade;
       add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

       location /api/ {
           proxy_pass http://localhost:3000/;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }

       location / {
           root /var/www/devsite/dist;
           index index.html;
           try_files $uri $uri/ /index.html;
       }
   }
   ```

3. **Code Analysis**: The Express backend uses tokei to analyze code stats from your local file system. These results are returned to the frontend via API.

4. **API Authorization**: All API endpoints should be protected with API key authentication:
   - Set a strong, random API_KEY in your `.env` file
   - API requests must include the header: `Authorization: Bearer YOUR_API_KEY`
   - In a production setup with authentication, frontend requests would include this header using     environment variables and server-side handling to avoid exposing the API key in the browser.
   - Requests without valid API key will receive a 401 Unauthorized response

# ⚠️ Note: While API key auth is recommended in most deployments, I’ve omitted it here intentionally for public demo purposes, as the /api/analyze response does not contain any private or sensitive information. 

5. **API Endpoints**: Your frontend requests stats from Express through /api/ routes that are proxied by Nginx.

   ```
   Client Request → Nginx → Express Backend (API Auth) → Local Repository Access → Code Analysis → Response
   ```

## 🔐 Security Tips for Self-Hosting

If you're hosting this project on your own server, lock it down properly:

- Use UFW or a firewall to block all ports except 80 and 443.
- Disable password SSH login, use key-based authentication only.
- Ensure the backend is never exposed directly — always use Nginx as a reverse proxy.
- Never expose internal repo paths via logs or responses.
- Consider disabling public access to your code analysis API without authentication. This step was omitted for my site as the json dump only reveals code counts, fragments, and basic server pathways like /opt/...
- Regularly update Node, Nginx, and dependencies to patch vulnerabilities.
- Run the backend as a non-root user and consider using a process manager like PM2.

## 📱 Mobile Support

The application is fully responsive and tested on various mobile devices. CSS breakpoints are used to ensure a smooth experience on all screen sizes.
