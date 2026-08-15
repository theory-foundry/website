import { toBaseMessages } from "@ai-sdk/langchain";
import { SystemMessage } from "@langchain/core/messages";
import { ChatOpenAI } from "@langchain/openai";
import type { UIMessage } from "ai";
import { createAgent } from "langchain";

import { THEORY_FOUNDRY_SYSTEM_PROMPT } from "@/constants/system-prompts/TheoryFoundrySystemPrompt";

import {
  getAIReadinessAuditTool,
  getAIRiskChecklistTool,
  getContactInfoTool,
  getCostAndObservabilityGuidanceTool,
  getServiceCatalogTool,
} from "./tools";

const MAX_OUTPUT_TOKENS = 800;
const REASONING_MODEL_PREFIXES = ["o1", "o3", "gpt-5"];
const CHAT_TOOLS = [
  getServiceCatalogTool,
  getAIReadinessAuditTool,
  getAIRiskChecklistTool,
  getCostAndObservabilityGuidanceTool,
  getContactInfoTool,
];
const CHAT_TOOL_NAMES = CHAT_TOOLS.map((tool) => tool.name);

export async function startChatAgentStream({ apiKey, messages }: { apiKey: string; messages: UIMessage[] }) {
  const modelName = process.env.OPENAI_MODEL ?? "gpt-4o-mini";
  const supportsReasoning = REASONING_MODEL_PREFIXES.some((prefix) => modelName.startsWith(prefix));
  const model = new ChatOpenAI({
    openAIApiKey: apiKey,
    maxTokens: MAX_OUTPUT_TOKENS,
    modelName,
    streaming: true,
    ...(supportsReasoning
      ? {
          reasoning: {
            effort: "medium",
            summary: "auto",
          },
        }
      : {
          temperature: 0.7,
        }),
  });

  const baseMessages = await toBaseMessages(messages);
  const agent = createAgent({ model, tools: CHAT_TOOLS });

  return agent
    .withConfig({
      metadata: {
        messageCount: messages.length,
        model: modelName,
        route: "/api/chat",
        toolNames: CHAT_TOOL_NAMES,
      },
      runName: "theory-foundry-marketing-chat",
      tags: ["theory-foundry-marketing-site", "ai-chat", modelName],
    })
    .streamEvents({ messages: [new SystemMessage(THEORY_FOUNDRY_SYSTEM_PROMPT), ...baseMessages] }, { version: "v2" });
}
