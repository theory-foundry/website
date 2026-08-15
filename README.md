# Theory Foundry

Theory Foundry is an AI-integration consultancy for small product companies. This repository contains the
[theoryfoundry.com](https://theoryfoundry.com) marketing site and its embedded AI integration example.

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

| Variable                         | Required | Description                                                                          |
| -------------------------------- | -------- | ------------------------------------------------------------------------------------ |
| `OPENAI_API_KEY`                 | ✅ Yes   | Your OpenAI API key (used by the `/api/chat` AI endpoint)                            |
| `OPENAI_MODEL`                   | No       | OpenAI model to use (defaults to `gpt-4o-mini`)                                      |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | ✅ Yes   | Public Turnstile widget key; use Cloudflare's test key locally                       |
| `TURNSTILE_SECRET`               | ✅ Yes   | Server-only Turnstile secret; use Cloudflare's test secret locally                   |
| `TURNSTILE_HOSTNAMES`            | ✅ Yes   | Comma-separated hostnames accepted from Siteverify                                   |
| `CHAT_IP_HASH_SECRET`            | ✅ Yes   | Secret used to HMAC IP-based quota identifiers                                       |
| `CHAT_DAILY_LIMIT`               | No       | Accepted prompts per IP per UTC day (defaults to `10`)                               |
| `LANGSMITH_TRACING`              | No       | Set to `true` to send LangChain traces for `/api/chat` to LangSmith                  |
| `LANGSMITH_API_KEY`              | No       | LangSmith API key used when tracing is enabled                                       |
| `LANGSMITH_PROJECT`              | No       | LangSmith project name for chat traces, e.g. `theory-foundry-marketing-ai`           |
| `LANGSMITH_ENDPOINT`             | No       | LangSmith API endpoint; only needed for non-default regions or self-hosted LangSmith |

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

## Validation

Run the complete local validation suite with:

```bash
pnpm verify
```

This checks that the Wrangler-generated Cloudflare binding types match `wrangler.jsonc`, then runs tests, lint, a
no-emit TypeScript check, and a production build. After changing Cloudflare bindings or `.env.example`, regenerate the
committed declarations with `pnpm cf-typegen`. If this repository's development server is running, the production build
automatically runs from a temporary copy of the working tree so it does not clean or replace the live server's `.next`
files. To force this behavior, run `pnpm verify:build --isolated`.

Do not run `pnpm build` directly while `pnpm dev` is running from the same checkout.

## AI Chat Feature

The portfolio includes an embedded LLM chat powered by:

- **Frontend:** [Vercel AI SDK](https://sdk.vercel.ai/) (`ai` / `@ai-sdk/react`) — `useChat` hook with streaming support
- **Backend:** [LangChain.js](https://js.langchain.com/) (`@langchain/openai`) — API route at `/api/chat`

The chat streams token-by-token responses and maintains conversation history in the UI session.

### Abuse protection

Every live chat request requires a fresh Cloudflare Turnstile token and consumes one request from a D1-backed per-IP
quota. The default quota is 10 accepted prompts per UTC day. The Worker stores only a date-scoped HMAC identifier, never
the visitor's raw IP address. Requests fail closed when Turnstile, D1, the Cloudflare client-IP header, or required
secrets are unavailable.

Local development uses Cloudflare's published always-pass Turnstile test keys from `.env.example`. Apply the D1 schema
to the local database before exercising Live AI in `/chat-test`:

```bash
pnpm exec wrangler d1 migrations apply CHAT_RATE_LIMIT_DB --local
```

### LangSmith Observability

The `/api/chat` LangChain agent includes a stable run name, tags, and metadata for LangSmith traces:

- Run name: `theory-foundry-marketing-chat`
- Tags: `theory-foundry-marketing-site`, `ai-chat`, and the configured OpenAI model
- Metadata: route, model, message count, and available tool names

To enable tracing, set `LANGSMITH_TRACING=true`, `LANGSMITH_API_KEY`, and optionally `LANGSMITH_PROJECT`. LangSmith traces can include prompts, tool inputs, and model outputs, so only enable it in environments where that data handling is approved.

## Deployment

The production target is Cloudflare Workers through OpenNext. Build and preview the Worker locally with:

```bash
pnpm preview
```

Deploy only as an intentional rollout step with `pnpm deploy`.

Cloudflare Workers Builds should use the stage-specific scripts so the OpenNext build runs exactly once:

```text
Build command:   pnpm run cf:build
Deploy command:  pnpm run cf:deploy
Version command: pnpm run cf:upload
```

`NEXT_PUBLIC_TURNSTILE_SITE_KEY` must be configured in Cloudflare's **Build variables and secrets** because Next.js
inlines it into the browser bundle during the build. It is a public widget key, not a secret.

Runtime configuration is split between `wrangler.jsonc` and Cloudflare Worker secrets:

| Location                        | Name                                                           |
| ------------------------------- | -------------------------------------------------------------- |
| `wrangler.jsonc` runtime vars   | `TURNSTILE_HOSTNAMES`, `CHAT_DAILY_LIMIT`, `OPENAI_MODEL`      |
| Cloudflare Worker secrets       | `OPENAI_API_KEY`, `TURNSTILE_SECRET`, `CHAT_IP_HASH_SECRET`    |
| Optional dashboard runtime vars | `LANGSMITH_TRACING`, `LANGSMITH_PROJECT`, `LANGSMITH_ENDPOINT` |
| Optional dashboard secret       | `LANGSMITH_API_KEY`                                            |
| Cloudflare build variable       | `NEXT_PUBLIC_TURNSTILE_SITE_KEY`                               |

The top-level `keep_vars` setting in `wrangler.jsonc` preserves optional runtime variables managed in the dashboard
when OpenNext deploys through Wrangler. Encrypted Worker secrets are preserved independently. Keep `.env`, `.env.*`,
and `.dev.vars*` files local; only the placeholder-only `.env.example` belongs in source control.

The deploy command publishes the production branch immediately. The version command is used for non-production branch
builds and uploads a preview version without promoting it to production. For deliberate local use, `pnpm preview`,
`pnpm deploy`, and `pnpm upload` combine the corresponding Cloudflare command with `cf:build`.

These OpenNext commands perform a production Next.js build. Do not run them from this checkout while `pnpm dev` is
running; use `pnpm verify` for routine validation because it isolates the build automatically.

### Domain rename rollout

The application permanently redirects requests for `rjlssystems.com` and `www.rjlssystems.com` to
`https://theoryfoundry.com`, preserving the path and query string. Before production rollout, attach the new domain and
both legacy domains to the Cloudflare Worker and configure their DNS records. Deployment and DNS changes are not part of
the repository rename and must be performed separately.

**Required production configuration:**

1. Add `NEXT_PUBLIC_TURNSTILE_SITE_KEY` to Cloudflare's build variables using the managed widget for
   `theoryfoundry.com`.
2. Store `OPENAI_API_KEY`, `TURNSTILE_SECRET`, and a long random `CHAT_IP_HASH_SECRET` as Cloudflare Worker secrets.
3. Keep the non-secret production defaults and the `CHAT_RATE_LIMIT_DB` binding in `wrangler.jsonc`.
4. Apply D1 migrations before promoting the Worker:

   ```bash
   pnpm exec wrangler d1 migrations apply CHAT_RATE_LIMIT_DB --remote
   ```

5. Add a zone-level rate limiting rule for exact path `/api/chat`: five requests per IP in 10 seconds, blocked for 10
   seconds. This is burst protection; the D1 check remains the authoritative daily quota.
6. Optionally add `LANGSMITH_TRACING=true`, `LANGSMITH_API_KEY`, and `LANGSMITH_PROJECT` to trace `/api/chat` runs in LangSmith.

See the [OpenNext Cloudflare documentation](https://opennext.js.org/cloudflare) for deployment details.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel AI SDK Documentation](https://sdk.vercel.ai/docs)
- [LangChain.js Documentation](https://js.langchain.com/docs)
