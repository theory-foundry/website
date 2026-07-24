import { tool } from "@langchain/core/tools";
import { z } from "zod";

export const getAIRiskChecklistTool = tool(
  async () =>
    JSON.stringify(
      {
        categories: [
          {
            name: "Employee AI usage",
            checks: [
              "Which AI tools are approved for business use?",
              "Are employees entering confidential customer, financial, legal, or internal strategy data?",
              "Is there a clear policy for acceptable AI use and review?",
            ],
          },
          {
            name: "Developer integrations",
            checks: [
              "Are model calls isolated behind controlled APIs?",
              "Do tools enforce least-privilege access and scoped actions?",
              "Are prompts, tool calls, outputs, and costs logged in a reviewable format appropriate to the workflow?",
            ],
          },
          {
            name: "Output quality and failure handling",
            checks: [
              "Are critical outputs evaluated before release?",
              "Are there fallback paths when models fail or produce low-confidence responses?",
              "Are model changes tested against expected behavior?",
            ],
          },
          {
            name: "Cost control",
            checks: [
              "Are usage limits, budgets, and alerts in place?",
              "Is high-cost model usage reserved for tasks that need it?",
              "Can teams attribute AI spend by workflow or feature?",
            ],
          },
        ],
      },
      null,
      2,
    ),
  {
    name: "get_ai_risk_checklist",
    description:
      "Returns a structured checklist of AI adoption risks across employee usage, scoped developer integrations, output quality and failure handling, and cost control.",
    schema: z.object({}),
  },
);
