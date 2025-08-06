import { exec } from 'child_process';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const isProduction = process.env.NODE_ENV === 'production';

/**
 * Analyzes a codebase and returns statistics
 * @param {string} project - The project to analyze (LockChain, AiQArt, SolMate)
 * @returns {Promise<object>} - A promise that resolves to the analysis results
 */
export async function analyzeRepo(project = 'LockChain') {
  return new Promise((resolve, reject) => {
    let repoPath;
    if (project === 'AiQArt') {
      // Use a more specific path or search for AiQArt files only
      repoPath = process.env.AIQART_REPO_PATH;
    } else if (project === 'SolMate') {
      // Use SolMate repo path
      repoPath = process.env.SOLMATE_REPO_PATH;
    } else {
      // Default to LockChain repo
      repoPath = isProduction
        ? process.env.PROD_REPO_PATH
        : process.env.DEV_REPO_PATH;
    }

    if (!repoPath) {
      return reject(new Error('Repository path not defined'));
    }

    // Exclude node_modules, build directories, and auto-generated code
    const excludeDirs = '--exclude=node_modules,dist,build,.gradle,target,vendor,external';
    
    let command;
    if (project === 'AiQArt') {
      // Use a super simple command for AiQArt - include both .kt and .xml files in the directory
      command = `cd "${repoPath}" && tokei *.kt *.xml --output json --sort=lines`;
    } else {
      command = `tokei "${repoPath}" ${excludeDirs} --output json --sort=lines`;
    }
    
    console.log(`Executing command: ${command}`);
    
    exec(command, { maxBuffer: 20 * 1024 * 1024 }, (err, stdout, stderr) => {
      if (err) {
        console.error('❌ Tokei error:', stderr || err);
        console.error(`Failed command was: ${command}`);
        
        return reject(new Error('Tokei failed: ' + (stderr || err)));
      }

      try {
        const stats = JSON.parse(stdout);
        resolve(stats);
      } catch (parseErr) {
        console.error('❌ JSON parse error:', parseErr);
        reject(new Error('Failed to parse tokei output: ' + parseErr.message));
      }
    });
  });
}

// For testing the module directly
// Use import.meta.url to detect if this is the main module
const isMainModule = import.meta.url === `file://${process.argv[1]}`;
if (isMainModule) {
  const testProject = process.argv[2] || 'LockChain';
  console.log(`📊 Testing repo analyzer with project: ${testProject}`);
  
  analyzeRepo(testProject)
    .then(stats => console.log(JSON.stringify(stats, null, 2)))
    .catch(err => console.error('Error:', err.message));
}
