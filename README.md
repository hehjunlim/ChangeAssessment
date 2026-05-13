# ChangeAssessment

AI Workflow Readiness Auditor with server-side API proxy.

## Setup

1. **Create `.env` file** in the project root:
   ```bash
   cp .env.example .env
   ```

2. **Add your Anthropic API key** to `.env`:
   ```
   ANTHROPIC_API_KEY=sk-ant-your_actual_key_here
   ```

3. **Install dependencies and start the server**:
   ```bash
   npm install
   npm start
   ```

The server will listen on `http://localhost:3001` and proxy `/api/chat` and `/api/analyze` requests to the Anthropic API using your key from the `.env` file.
