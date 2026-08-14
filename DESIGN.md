# Design

## Source of truth

- Status: Active
- Last refreshed: 2026-08-14
- Primary product surfaces: Homepage, focused integration offer, delivery process, contact, blog, AI-readiness diagnostic, and the homepage chat demonstration.
- Evidence reviewed: `AGENTS.md`, `README.md`, `tailwind.config.ts`, `src/app/globals.css`, `src/constants/ColorTheme.ts`, homepage and chat components, chat harness scenarios, and the supplied dark-mode chat screenshot path (unreadable because macOS denied access to the temporary folder).

## Brand

- Personality: Practical, calm, technically credible, specific, and approachable.
- Trust signals: Clear scope, restrained claims, explicit operating boundaries, legible hierarchy, and consistent interaction states.
- Avoid: AI hype, generic neon/cyber styling, low-contrast translucent surfaces, excessive decoration, and claims of guaranteed safety or outcomes.

## Product goals

- Goals: Explain the focused AI-integration offer, demonstrate a useful scoped assistant experience, and lead suitable visitors toward an exploratory email conversation.
- Non-goals: Replacing client systems, implying access to visitor data, promoting the readiness audit as the primary offer, lead capture, or booking automation.
- Success signals: Visitors can quickly understand the offer, distinguish the demo from a connected client integration, read and operate the chat comfortably, and find the contact path.

## Personas and jobs

- Primary personas: Product and engineering leaders at small product companies with existing applications, data, and workflows.
- User jobs: Assess fit, understand what an integration can do, understand delivery safeguards, and start an exploratory conversation.
- Key contexts of use: Desktop and mobile browsing, light and dark themes, and scanning before deeper reading.

## Information architecture

- Primary navigation: Home, Our process, Contact, and Blog.
- Core routes/screens: `/`, `/our-process`, `/contact`, `/blog`, `/blog/[id]`, and the secondary `/ai-readiness-audit` diagnostic.
- Content hierarchy: Focused integration offer first, concrete workflow value second, delivery and safeguards next, exploratory contact last.

## Design principles

- Use contrast and hierarchy to make complex integration work feel understandable.
- Keep the visual language grounded in the existing navy, forest, mint, sage, cream, and night palette.
- Prefer opaque, purposeful surfaces over stacked translucency when readability is the priority.
- Tradeoffs: Favor clarity and stable contrast over ornamental depth; use motion sparingly and preserve reduced-motion behavior.

## Visual language

- Color: Cream and mist anchor light mode. Night, deep navy-teal panels, forest, sage, and mint anchor dark mode. Dark chat surfaces use `night` for the deepest layer, `night-panel` for the shell, and `night-raised` for interactive or nested surfaces.
- Typography: Existing sans typography for primary content and mono typography for labels and technical metadata.
- Spacing/layout rhythm: Existing Tailwind spacing scale, generous section spacing, compact chat controls, and readable message measure.
- Shape/radius/elevation: Moderate rounded corners, thin borders, and restrained shadows. Dark-mode elevation should come primarily from tonal separation and near-black shadows.
- Motion: Short hover/press transitions and existing streaming feedback; no decorative animation that competes with content.
- Imagery/iconography: Existing Theory Foundry assets and simple line icons; avoid decorative AI imagery.

## Components

- Existing components to reuse: Theme primitives, chat conversation and empty states, prompt input, message, reasoning, tool, and harness components.
- New/changed components: No new component layer. Dark variants of existing chat surfaces receive stronger tonal separation and border contrast.
- Variants and states: Empty, conversation, loading, streaming, tool, reasoning, error, disabled, hover, focus, and pressed states must remain distinguishable in both themes.
- Token/component ownership: Shared brand colors live in `tailwind.config.ts` and `src/constants/ColorTheme.ts`; chat-specific application remains colocated with chat and AI-element components.

## Accessibility

- Target standard: WCAG 2.2 AA for text and interactive controls.
- Keyboard/focus behavior: Preserve semantic controls, visible focus outlines, Enter-to-submit, and Shift+Enter for multiline input.
- Contrast/readability: Primary cream, secondary sage, and accent mint text must remain clearly legible on all dark chat layers; focused borders use mint rather than translucent cream.
- Screen-reader semantics: Preserve existing labels, live loading status, button names, and message structure.
- Reduced motion and sensory considerations: Respect the global reduced-motion override and do not rely on color or animation alone for status.

## Responsive behavior

- Supported breakpoints/devices: Mobile through wide desktop using the current Tailwind breakpoints.
- Layout adaptations: Chat controls and suggestions remain touch-friendly, messages stay within the viewport, and the shell preserves readable padding at narrow widths.
- Touch/hover differences: Hover is supplemental; pressed, focus, and disabled states remain visible without hover.

## Interaction states

- Loading: Preserve the labeled shimmer with sufficient dark-surface contrast.
- Empty: Prompt, suggestions, and explanatory copy remain visually distinct from the shell.
- Error: Use the existing explicit error copy and red treatment with readable dark equivalents.
- Success: Completed tool state retains icon and text cues.
- Disabled: Preserve reduced opacity while retaining enough shape and context to identify the control.
- Offline/slow network, if applicable: Use the existing connection error and streaming states; do not imply successful completion while pending.

## Content voice

- Tone: Direct, specific, business-oriented, and technically grounded.
- Terminology: Focused AI integration, approved APIs/data/tools, permitted actions, existing permissions, testing, observability, and failure handling.
- Microcopy rules: Do not describe email as booking or lead capture, do not imply access to visitor systems, and avoid unsupported security or ROI claims.

## Implementation constraints

- Framework/styling system: Next.js App Router, React 18, strict TypeScript, Tailwind CSS, Sass, and existing theme utilities.
- Design-token constraints: Extend the current palette instead of introducing a separate design system; keep light-mode behavior unchanged for dark-only refinements.
- Performance constraints: No new dependencies or image assets for surface-color changes.
- Compatibility constraints: Preserve server components unless client state is required and keep `@/*` imports for `src/*`.
- Test/screenshot expectations: Run `pnpm lint` and `pnpm build`; visually check the affected chat route at desktop and mobile widths in light and dark themes and exercise `/chat-test` scenarios for chat states.

## Open questions

- [ ] Reattach or move the supplied screenshot into the repository if exact before/after comparison is needed; its current macOS temporary path is not readable by the workspace process.
