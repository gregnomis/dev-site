import express from 'express';
import { exec } from 'child_process';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

// Get directory name correctly in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const isProduction = process.env.NODE_ENV === 'production';

// Enable CORS for the frontend
app.use(cors());

// Serve the static files if in production
if (isProduction) {
  const distDir = path.join(__dirname, '../dist');
  app.use(express.static(distDir));
}

// Add basic API endpoint for analyzing repos
app.get('/api/analyze', (req, res) => {
  // Get the project from query param or default to LockChain
  const project = req.query.project || 'LockChain';
  
  let repoPath;
  if (project === 'AiQArt') {
    repoPath = process.env.AIQART_REPO_PATH;
  } else if (project === 'SolMate') {
    repoPath = process.env.SOLMATE_REPO_PATH;
  } else {
    repoPath = isProduction
      ? process.env.PROD_REPO_PATH
      : process.env.DEV_REPO_PATH;
  }

  if (!repoPath) {
    return res.status(500).json({ error: 'Repository path not defined' });
  }

  // Check if tokei is installed
  exec('which tokei', (err, stdout) => {
    if (err || !stdout.trim()) {
      console.error('❌ Tokei is not installed or not in PATH');
      return res.status(500).json({ error: 'Tokei not found. Please install tokei first.' });
    }

    // Proceed with analysis
    const excludeDirs = '--exclude=node_modules,dist,build,.gradle,target,vendor,external';
    
    let command;
    if (project === 'AiQArt') {
      // Use a super simple command for AiQArt - include both .kt and .xml files in the directory
      command = `cd "${repoPath}" && tokei *.kt *.xml --output json --sort=lines`;
    } else {
      command = `tokei "${repoPath}" ${excludeDirs} --output json --sort=lines`;
    }
    
    console.log(`Executing command: ${command}`);
    
    exec(command, { maxBuffer: 20 * 1024 * 1024 }, (execErr, stdout, stderr) => {
      if (execErr) {
        
        return res.status(500).json({ 
          error: 'Tokei analysis failed', 
          project: project,
          details: stderr || execErr.message 
        });
      }

      try {
        const stats = JSON.parse(stdout);
        res.json(stats);
      } catch (parseErr) {
        res.status(500).json({ error: 'Failed to parse tokei output' });
      }
    });
  });
});

// Simple catch-all route handler that should work better
if (isProduction) {
  app.use((req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
  });
}

app.listen(PORT, () => {
});
