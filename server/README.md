# Code Analysis Server

This is a simple Express server that provides code analysis for the portfolio site. It uses Tokei to analyze codebases and return statistics about lines of code, language breakdown, etc.

## Setup

1. Make sure Tokei is installed on your system
2. Create a `.env` file with the following variables:
   ```
   DEV_REPO_PATH=/path/to/your/dev/repo
   PROD_REPO_PATH=/path/to/your/prod/repo
   ```

## Endpoints

- `GET /api/analyze` - Returns JSON with code statistics

## Running

The server runs on port 5001 by default and is started via:
```
npm run dev:backend
```
