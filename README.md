# ChangeAssessment

Server proxy for Anthropic API

 - Create a `.env` file or set `ANTHROPIC_API_KEY` in your environment.
 - Install dependencies and start the proxy server:

```bash
npm install
npm start
```

The frontend will call `/api/chat` and `/api/analyze` on the same origin. In development, run the proxy and serve the frontend from the same host or configure your dev server to proxy `/api` to the server port.
