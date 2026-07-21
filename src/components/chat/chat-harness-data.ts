import type { ChatStatus, DynamicToolUIPart, ReasoningUIPart, TextUIPart, UIMessage } from "ai";

export type ChatHarnessScenarioId = "service-brief" | "tool-error" | "approval" | "markdown-stream";

export type ChatHarnessFrame = {
  delayMs: number;
  parts: UIMessage["parts"];
  status: ChatStatus;
};

export type ChatHarnessScenario = {
  description: string;
  frames: ChatHarnessFrame[];
  id: ChatHarnessScenarioId;
  label: string;
  prompt: string;
};

const textPart = (text: string, state: TextUIPart["state"] = "done"): TextUIPart => ({
  state,
  text,
  type: "text",
});

const reasoningPart = (text: string, state: ReasoningUIPart["state"] = "done"): ReasoningUIPart => ({
  state,
  text,
  type: "reasoning",
});

const dynamicToolPart = ({
  errorText,
  input,
  output,
  state,
  toolCallId,
  toolName,
}: {
  errorText?: string;
  input: unknown;
  output?: unknown;
  state: DynamicToolUIPart["state"];
  toolCallId: string;
  toolName: string;
}): DynamicToolUIPart => {
  const base = { input, toolCallId, toolName, type: "dynamic-tool" as const };

  switch (state) {
    case "input-streaming":
    case "input-available":
      return { ...base, state };
    case "approval-requested":
      return {
        ...base,
        approval: { id: `${toolCallId}-approval` },
        state,
      };
    case "approval-responded":
      return {
        ...base,
        approval: { approved: false, id: `${toolCallId}-approval`, reason: "Harness mode blocks external systems." },
        state,
      };
    case "output-available":
      return { ...base, output, state };
    case "output-denied":
      return {
        ...base,
        approval: { approved: false, id: `${toolCallId}-approval`, reason: "Harness mode blocks external systems." },
        state,
      };
    case "output-error":
      return { ...base, errorText: errorText ?? "The harness forced an error for UI testing.", state };
  }
};

const serviceReasoning =
  "Checking the RJLS service catalog first so the answer stays grounded in the firm's actual offer.";

const serviceToolInput = { sections: ["services", "commonOutcomes", "bestFit"], tone: "business-leader" };

const serviceToolOutput = {
  focus: ["connected AI services", "custom chat frontends", "secure business-system integrations"],
  strongestSignals: [
    "Connects AI chat to approved APIs, applications, and business data.",
    "Uses existing identity, permissions, validation, and approval rules.",
    "Delivers the user experience and production controls as one complete integration.",
  ],
};

const riskToolInput = { categories: ["employee usage", "developer integrations", "cost control"] };

const markdownText = `Here is a markdown-heavy response for spacing and typography work:

1. Highlights
- Strong React and Next.js depth
- Connected AI chat experiences
- Secure API and data integrations
- Production reliability and control

2. Sample code
\`\`\`ts
const stack = ["Next.js", "TypeScript", "LangChain", "MCP", "OpenAI"];
const strongestAngle = stack.join(" / ");
\`\`\`

3. Final note
This transcript is fully scripted so you can iterate on layout without spending AI tokens.`;

export const CHAT_HARNESS_SCENARIOS: ChatHarnessScenario[] = [
  {
    description: "Streams reasoning, a successful tool call, and a business-facing service answer.",
    frames: [
      {
        delayMs: 400,
        parts: [
          reasoningPart("Reviewing RJLS service positioning and common client needs...", "streaming"),
          textPart("Pulling together the most relevant AI integration guidance...", "streaming"),
        ],
        status: "streaming",
      },
      {
        delayMs: 900,
        parts: [
          reasoningPart(serviceReasoning),
          dynamicToolPart({
            input: serviceToolInput,
            state: "input-available",
            toolCallId: "service-lookup",
            toolName: "get_service_catalog",
          }),
          textPart("I checked the service catalog first so the answer stays concrete.", "streaming"),
        ],
        status: "streaming",
      },
      {
        delayMs: 850,
        parts: [
          reasoningPart(serviceReasoning),
          dynamicToolPart({
            input: serviceToolInput,
            output: serviceToolOutput,
            state: "output-available",
            toolCallId: "service-lookup",
            toolName: "get_service_catalog",
          }),
          textPart(
            "RJLS Systems designs and builds complete AI chat experiences connected to a business's applications, APIs, authentication, and data. The assistant can find information and complete approved updates while existing permissions and business rules remain in control.",
            "streaming",
          ),
        ],
        status: "streaming",
      },
      {
        delayMs: 700,
        parts: [
          reasoningPart(serviceReasoning),
          dynamicToolPart({
            input: serviceToolInput,
            output: serviceToolOutput,
            state: "output-available",
            toolCallId: "service-lookup",
            toolName: "get_service_catalog",
          }),
          textPart(
            "RJLS Systems designs and builds complete AI chat experiences connected to a business's applications, APIs, authentication, and data. The assistant can find information and complete approved updates while existing permissions and business rules remain in control.\n\nRJLS delivers both the connected AI service and the customer-facing or internal chat interface, so the result is a usable business capability rather than disconnected infrastructure.",
          ),
        ],
        status: "ready",
      },
    ],
    id: "service-brief",
    label: "Service brief",
    prompt: "How could RJLS connect AI chat to our business systems?",
  },
  {
    description: "Shows a failed tool invocation and the assistant's fallback copy.",
    frames: [
      {
        delayMs: 350,
        parts: [
          reasoningPart("Looking for AI risk categories before recommending a next step...", "streaming"),
          textPart("Checking the risk checklist before I answer...", "streaming"),
        ],
        status: "streaming",
      },
      {
        delayMs: 800,
        parts: [
          reasoningPart("Looking for AI risk categories before recommending a next step..."),
          dynamicToolPart({
            input: riskToolInput,
            state: "input-available",
            toolCallId: "risk-lookup",
            toolName: "get_ai_risk_checklist",
          }),
          textPart("The risk checklist lookup is running now.", "streaming"),
        ],
        status: "streaming",
      },
      {
        delayMs: 850,
        parts: [
          reasoningPart("Looking for AI risk categories before recommending a next step..."),
          dynamicToolPart({
            errorText: "Risk checklist service timed out after 8 seconds in harness mode.",
            input: riskToolInput,
            state: "output-error",
            toolCallId: "risk-lookup",
            toolName: "get_ai_risk_checklist",
          }),
          textPart(
            "The checklist lookup failed, so I would fall back to the core RJLS guidance: start by identifying unmanaged employee AI usage, sensitive data exposure, missing output review, and unbounded model spend.",
          ),
        ],
        status: "ready",
      },
    ],
    id: "tool-error",
    label: "Tool error",
    prompt: "What AI risks should we check first?",
  },
  {
    description: "Exercises approval-related tool states without calling any external system.",
    frames: [
      {
        delayMs: 350,
        parts: [
          reasoningPart("Showing what a blocked tool flow looks like in the transcript UI...", "streaming"),
          textPart("Preparing an approval-state example.", "streaming"),
        ],
        status: "streaming",
      },
      {
        delayMs: 800,
        parts: [
          reasoningPart("Showing what a blocked tool flow looks like in the transcript UI..."),
          dynamicToolPart({
            input: { destination: "lead system", reason: "Need permission to send contact details externally" },
            state: "approval-requested",
            toolCallId: "lead-access",
            toolName: "open_lead_system",
          }),
          textPart("The assistant is waiting for approval before it can continue.", "streaming"),
        ],
        status: "streaming",
      },
      {
        delayMs: 800,
        parts: [
          reasoningPart("Showing what a blocked tool flow looks like in the transcript UI..."),
          dynamicToolPart({
            input: { destination: "lead system", reason: "Need permission to send contact details externally" },
            state: "approval-responded",
            toolCallId: "lead-access",
            toolName: "open_lead_system",
          }),
          textPart(
            "Approval was denied, so the assistant stays on the safe path and explains what happened.",
            "streaming",
          ),
        ],
        status: "streaming",
      },
      {
        delayMs: 700,
        parts: [
          reasoningPart("Showing what a blocked tool flow looks like in the transcript UI..."),
          dynamicToolPart({
            input: { destination: "lead system", reason: "Need permission to send contact details externally" },
            state: "output-denied",
            toolCallId: "lead-access",
            toolName: "open_lead_system",
          }),
          textPart(
            "That action was blocked because the requested system needs explicit approval. In a real flow, the assistant would ask the user to approve access or choose a safer alternative.",
          ),
        ],
        status: "ready",
      },
    ],
    id: "approval",
    label: "Approval flow",
    prompt: "Show me how an approval or blocked tool call looks in the transcript.",
  },
  {
    description: "Streams a markdown-heavy answer for typography and spacing tweaks.",
    frames: [
      {
        delayMs: 300,
        parts: [
          textPart("Here is a markdown-heavy response for spacing and typography work:\n\n1. Highlights", "streaming"),
        ],
        status: "streaming",
      },
      {
        delayMs: 600,
        parts: [
          textPart(
            "Here is a markdown-heavy response for spacing and typography work:\n\n1. Highlights\n- Strong React and Next.js depth\n- Product-minded AI integration work",
            "streaming",
          ),
        ],
        status: "streaming",
      },
      {
        delayMs: 700,
        parts: [textPart(markdownText)],
        status: "ready",
      },
    ],
    id: "markdown-stream",
    label: "Markdown stream",
    prompt: "Stream a markdown-heavy answer with bullets and code.",
  },
];

export const DEFAULT_CHAT_HARNESS_SCENARIO_ID = CHAT_HARNESS_SCENARIOS[0].id;

export const CHAT_HARNESS_SUGGESTIONS = CHAT_HARNESS_SCENARIOS.map((scenario) => scenario.prompt);

export const getChatHarnessScenario = (scenarioId: ChatHarnessScenarioId) =>
  CHAT_HARNESS_SCENARIOS.find((scenario) => scenario.id === scenarioId) ?? CHAT_HARNESS_SCENARIOS[0];
