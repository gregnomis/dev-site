# 🧠 Code Analysis Server

This lightweight Express server provides live code statistics for your portfolio site using [Tokei](https://github.com/XAMPPRocky/tokei). It returns language breakdowns, total lines of code, and other useful metrics.

---

## 📦 Features

- REST API endpoint to fetch code statistics
- Uses [Tokei](https://github.com/XAMPPRocky/tokei) under the hood
- Supports both dev and production codebase stats
- Easily embeddable into frontend dashboards or portfolios

---

## 🛠️ Setup

1. **Install [Tokei](https://github.com/XAMPPRocky/tokei)**  
   Make sure it's available in your system path.

2. **Clone this repo and install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   Create a `.env` file in the root directory with:

   ```env
   DEV_REPO_PATH=/absolute/path/to/your/dev/codebase
   PROD_REPO_PATH=/absolute/path/to/your/prod/codebase
   # API_KEY is optional for demo purposes, but recommended for production
   API_KEY=your_secure_api_key_here
   ```

## 🔐 API Security

> ⚠️ **Note:** While the API includes authentication capabilities, it's intentionally disabled on my public demo site since the API responses don't contain sensitive information. API authentication should be implemented for production deployments or when your code repositories contain private information.

The API can be protected with Bearer token authentication:

```bash
# Example request with auth
curl -H "Authorization: Bearer your_api_key_here" http://localhost:5001/api/analyze
```

## 🚀 Usage

Start the server locally:

```bash
npm run dev:backend
```

By default, it runs at http://localhost:5001.

## 📡 API Endpoint

### GET /api/analyze

> This endpoint runs on the same server as your code repositories and analyzes them directly from the local filesystem.

Returns a JSON payload like:

```json
{
  "Rust": { "code": 1534, "comments": 212, "blanks": 83, "files": 9 },
  "JavaScript": { "code": 2311, "comments": 145, "blanks": 94, "files": 7 },
  "HTML": { "code": 998, "comments": 10, "blanks": 45, "files": 3 },
  "CSS": { "code": 654, "comments": 6, "blanks": 28, "files": 2 }
}
```

The actual result will vary depending on your codebase.

## 📁 Folder Structure

```bash
/server
  ├── analyzeRepo.js     # Core logic to run Tokei and parse output
  ├── analyzeServer.js   # Express server setup
  └── API_AUTH_README.md # Detailed API authentication docs
```

## 🖥️ Important Hosting Requirements

**This server must be hosted on the same physical machine as your code repositories.** 

The server directly accesses your local file system to analyze code repositories. It's designed to:
1. Run on the same server where your repositories are stored
2. Access those repositories via filesystem paths defined in environment variables
3. Have the necessary permissions to read those directories

This is not a cloud service - it's a self-hosted tool that provides API access to code statistics for repositories that exist on the same machine.

## ✅ Example Use Case

This server powers dynamic code stats on a portfolio site (like gregsimon.dev) by fetching live data from real codebases that are stored locally on the same server where the website is hosted.

## 🧑‍💻 Author

Greg Simon – @gregnomis

## 🛡️ License

MIT
