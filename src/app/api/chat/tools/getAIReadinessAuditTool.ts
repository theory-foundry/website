import { tool } from "@langchain/core/tools";
import { z } from "zod";
import { THEORY_FOUNDRY } from "@/constants/TheoryFoundry";

export const getAIReadinessAuditTool = tool(
  async () =>
    JSON.stringify(
      {
        offer: "AI Readiness Audit",
        purpose:
          "Give leadership a clear picture of current AI usage, practical risks, integration opportunities, and prioritized next steps before broader implementation.",
        bestFor:
          "Organizations specifically looking to assess current AI usage, risks, controls, and implementation priorities. It is a supporting diagnostic offer, not the default next step for a clear integration inquiry.",
        stages: [
          "Discover current employee AI usage, approved tools, policies, and developer integrations.",
          "Review data exposure, access boundaries, prompt and tool controls, output quality, and operational visibility.",
          "Prioritize remediation and implementation opportunities by risk, effort, and business value.",
          "Deliver an executive summary and implementation roadmap.",
        ],
        deliverables: THEORY_FOUNDRY.auditDeliverables,
        nextStep: `Email ${THEORY_FOUNDRY.contactEmail} with the subject "AI Readiness Audit" to start an audit-specific conversation.`,
      },
      null,
      2,
    ),
  {
    name: "get_ai_readiness_audit",
    description:
      "Returns the Theory Foundry AI readiness audit fit, process, purpose, stages, deliverables, and inquiry path.",
    schema: z.object({}),
  },
);
