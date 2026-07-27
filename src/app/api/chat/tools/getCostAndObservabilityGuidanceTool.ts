import { tool } from "@langchain/core/tools";
import { z } from "zod";

export const getCostAndObservabilityGuidanceTool = tool(
  async () =>
    JSON.stringify(
      {
        principles: [
          "Route work to the least expensive model that meets quality requirements.",
          "Set per-feature budgets, rate limits, and alerts before broad rollout.",
          "Log prompts, tool calls, model responses, latency, token usage, and errors in a reviewable format appropriate to the agreed workflow and operating environment.",
          "Use evals and representative test cases to detect output regressions.",
          "Add human review for high-impact actions and sensitive outputs.",
        ],
        implementationAreas: [
          "Model gateway or shared service for policy enforcement.",
          "Usage dashboards tied to teams, products, or workflows.",
          "Prompt and tool-call traces for debugging and governance.",
          "Quality checks, fallback behavior, and release gates for AI features.",
        ],
      },
      null,
      2,
    ),
  {
    name: "get_cost_and_observability_guidance",
    description:
      "Returns RJLS guidance for scoped cost controls, observability, testing, and failure handling for an agreed AI workflow.",
    schema: z.object({}),
  },
);
