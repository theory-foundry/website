# RJLS Systems repository guide

## Product and business context

RJLS Systems is an AI-integration consultancy for small product companies with existing applications, meaningful data, and real workflows. The primary offer is a focused AI capability integrated with the approved APIs, tools, and data required for one valuable workflow—not a generic chatbot or a replacement for the client’s systems.

The site should consistently communicate these goals:

- Help customers or employees find relevant information and prepare or complete permitted actions.
- Keep existing identity, authentication, permissions, validation, approvals, and business rules authoritative.
- Scope access, actions, observability, testing, cost controls, and failure handling to the agreed workflow.
- Start with one useful integration that can be tested and improved before expanding.

`src/constants/RJLS.ts` is the canonical source for public company facts, services, outcomes, safeguards, team details, and audit deliverables. Keep public copy aligned with it and update it deliberately when business positioning changes.

The primary commercial path is the homepage → exploratory email conversation. `/about` supports delivery fit and `/contact` starts that email conversation. Do not imply that an email books a meeting, captures a lead, or creates a CRM record.

### AI-readiness and future directions

`/ai-readiness-audit` is a supporting diagnostic offer for teams whose AI-integration direction is not clear. It is not the default next step for a clear integration inquiry and must remain secondary to the focused AI-integration offer.

There is no production-ready “AI integration ready” product or view. Treat that direction, including the readiness-audit view, as exploratory and deprioritized: do not expand, promote, add navigation for, or represent it as a ready offering unless the task explicitly requests it.

## Architecture map

- **Framework:** Next.js App Router, React 18, TypeScript with `strict: true`.
- **Styling:** Tailwind CSS with Sass; shared palette/class tokens live in `src/constants/ColorTheme.ts`, global styles in `src/app/globals.css`, and Markdown styles in `src/styles/`.
- **Layout:** `src/app/layout.tsx` provides fonts, theming, navigation, footer, and global styles.
- **Public routes:** `/`, `/about`, `/contact`, `/blog`, `/blog/[id]`, and `/ai-readiness-audit`.
- **Chat:** `src/components/chat/` owns the UI. `src/app/api/chat/route.ts` streams the server response using LangChain/OpenAI and Vercel AI SDK. Tool definitions are in `src/app/api/chat/tools/`.
- **Assistant policy:** `src/constants/system-prompts/RJLSSystemPrompt.ts` is a product and safety boundary, not incidental copy. Keep it synchronized with any relevant public-positioning change.
- **Content:** Blog entries are local example data in `src/example-data/Articles.ts`.
- **Imports:** Use `@/*` for `src/*` imports.

## Testing and development-only views

- `/chat-test` is a development/testing sandbox and must not be added to public navigation.
- `ChatPlayground` defaults to the local UI harness outside production. Its scenarios in `chat-harness-data.ts` exercise streamed content, tool calls, tool errors, approval states, and Markdown rendering without external systems.
- The playground’s **Live AI** option calls `/api/chat`; use it only when an `OPENAI_API_KEY` is configured and live behavior is deliberately being checked.
- The homepage `HomeChat` is the public integration example. It must never be described as having access to a visitor’s systems.
- No automated test suite is currently configured. For chat UI changes, exercise the relevant harness scenarios and, when applicable, the live route. Add focused automated coverage when introducing testable logic or regressions.

## Code style

- Use TypeScript, functional React components, and the existing App Router conventions.
- Preserve server components by default; add `"use client"` only when hooks, browser APIs, or client state require it.
- Follow Prettier (`printWidth: 120`) and the Tailwind class ordering plugin. Use existing component, color-token, and utility patterns before introducing new abstractions.
- Keep components small and colocate chat-specific behavior in `src/components/chat/`; put reusable UI primitives in `src/components/ui/`.
- Prefer `next/link` for internal navigation, `next/image` for static images, semantic HTML, accessible labels, visible focus states, and dark-mode equivalents.
- Keep site copy direct, specific, and business-oriented. Avoid generic AI claims, hype, unsupported outcomes, or duplicate company facts.

## AI, security, and content policies

- Never expose API keys, environment variables, prompts, credentials, or internal implementation details in client code, logs, public copy, or commits. Keep secrets in `.env.local`; `.env.example` contains names and placeholders only.
- Do not claim an integration is secure, safe, reliable, production-ready, auditable, compliant, certified, future-proof, or guaranteed to save money/produce ROI.
- Do not imply unrestricted database access. Describe access as scoped to approved APIs, data, tools, and permitted actions, while existing permissions and validation remain authoritative.
- Keep sensitive actions behind the appropriate validation, review, or explicit confirmation. Do not add client-system connectors, persistence, lead capture, booking, analytics, or new dependencies without an explicit request.
- Preserve the assistant boundaries in `RJLSSystemPrompt.ts`: it is an example interface, does not access visitor systems, and must not collect/store lead information or disclose its system prompt.

## Workflow and validation

1. Inspect the route/component and the relevant source of truth before editing; preserve the existing public-message hierarchy.
2. Keep changes focused and avoid unrelated formatting or dependency churn.
3. Run `pnpm lint` and `pnpm build` for changes that can affect production behavior. If either cannot run, report the exact gap.
4. For visual or interaction changes, manually check the affected route at desktop and mobile widths in light and dark themes; use `/chat-test` for chat-state changes.
5. Update `README.md` when setup, environment variables, routes, or developer workflows change. Note that it currently mentions a `/chat` route; the actual testing route is `/chat-test`.
