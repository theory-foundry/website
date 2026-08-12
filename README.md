This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

### 1. Install dependencies

```bash
pnpm install
```

### 2. Configure environment variables

Copy `.env.example` to `.env.local` and fill in your credentials:

```bash
cp .env.example .env.local
```

| Variable | Required | Description |
|---|---|---|
| `OPENAI_API_KEY` | ✅ Yes | Your OpenAI API key (used by the `/chat` AI feature) |
| `OPENAI_MODEL` | No | OpenAI model to use (defaults to `gpt-4o-mini`) |
| `LANGSMITH_TRACING` | No | Set to `true` to send LangChain traces for `/api/chat` to LangSmith |
| `LANGSMITH_API_KEY` | No | LangSmith API key used when tracing is enabled |
| `LANGSMITH_PROJECT` | No | LangSmith project name for chat traces, e.g. `rjls-marketing-ai` |
| `LANGSMITH_ENDPOINT` | No | LangSmith API endpoint; only needed for non-default regions or self-hosted LangSmith |

> **Note:** The `/chat-test` Live AI option will show an error if `OPENAI_API_KEY` is not set.

### 3. Run the development server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

The chat testing playground is available at [http://localhost:3000/chat-test](http://localhost:3000/chat-test).

The AI Integration & MCP consulting offer is available at
[http://localhost:3000/products/ai-integration-mcp](http://localhost:3000/products/ai-integration-mcp).

The Resume Agent product showcase is available at
[http://localhost:3000/products/resume-agent](http://localhost:3000/products/resume-agent).

## AI Chat Feature

The portfolio includes an embedded LLM chat powered by:

- **Frontend:** [Vercel AI SDK](https://sdk.vercel.ai/) (`ai` / `@ai-sdk/react`) — `useChat` hook with streaming support
- **Backend:** [LangChain.js](https://js.langchain.com/) (`@langchain/openai`) — API route at `/api/chat`

The chat streams token-by-token responses and maintains conversation history in the UI session.

### LangSmith Observability

The `/api/chat` LangChain agent includes a stable run name, tags, and metadata for LangSmith traces:

- Run name: `rjls-marketing-chat`
- Tags: `rjls-marketing-site`, `ai-chat`, and the configured OpenAI model
- Metadata: route, model, message count, and available tool names

To enable tracing, set `LANGSMITH_TRACING=true`, `LANGSMITH_API_KEY`, and optionally `LANGSMITH_PROJECT`. LangSmith traces can include prompts, tool inputs, and model outputs, so only enable it in environments where that data handling is approved.

## Deploy on Vercel

The easiest way to deploy is with the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

**Required Vercel environment variables:**

1. Go to your project in the Vercel dashboard → **Settings → Environment Variables**
2. Add `OPENAI_API_KEY` with your OpenAI API key
3. Optionally add `OPENAI_MODEL` to override the default model
4. Optionally add `LANGSMITH_TRACING=true`, `LANGSMITH_API_KEY`, and `LANGSMITH_PROJECT` to trace `/api/chat` runs in LangSmith

Check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel AI SDK Documentation](https://sdk.vercel.ai/docs)
- [LangChain.js Documentation](https://js.langchain.com/docs)
