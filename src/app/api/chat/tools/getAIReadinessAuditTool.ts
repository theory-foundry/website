import { tool } from "@langchain/core/tools";
import { z } from "zod";
import { RJLS } from "@/constants/RJLS";

export const getAIReadinessAuditTool = tool(
  async () =>
    JSON.stringify(
      {
        offer: "AI Readiness Audit",
        purpose:
          "Give leadership a clear picture of current AI usage, practical risks, integration opportunities, and the highest-value next steps.",
        stages: [
          "Discover current employee AI usage, approved tools, policies, and developer integrations.",
          "Review data exposure, access boundaries, prompt and tool controls, output quality, and operational visibility.",
          "Prioritize remediation and implementation opportunities by risk, effort, and business value.",
          "Deliver an executive summary and implementation roadmap.",
        ],
        deliverables: RJLS.auditDeliverables,
      },
      null,
      2,
    ),
  {
    name: "get_ai_readiness_audit",
    description:
      "Returns the RJLS Systems AI readiness audit process, purpose, stages, and deliverables.",
    schema: z.object({}),
  },
);
