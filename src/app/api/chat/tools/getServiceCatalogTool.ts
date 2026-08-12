import { tool } from "@langchain/core/tools";
import { z } from "zod";
import { THEORY_FOUNDRY } from "@/constants/TheoryFoundry";

export const getServiceCatalogTool = tool(
  async () =>
    JSON.stringify(
      {
        companyName: THEORY_FOUNDRY.companyName,
        tagline: THEORY_FOUNDRY.tagline,
        services: THEORY_FOUNDRY.services,
        commonOutcomes: THEORY_FOUNDRY.integrationOutcomes,
        exampleUseCases: THEORY_FOUNDRY.useCases,
        safeguards: THEORY_FOUNDRY.safeguards,
        bestFit:
          "Founders and technical teams at small product companies whose existing applications or services already contain meaningful data and workflows.",
        delivery:
          "Theory Foundry can design and build focused AI that works with an existing app's data and workflows: the user experience, connected AI service, and scoped connections to approved APIs, backend services, tools, and business data. Existing identity, permissions, validation, and business rules remain authoritative, while testing, logging, observability, cost controls, and failure paths are defined for the agreed workflow and operating environment.",
        whyTheoryFoundry:
          "Ralph brings decades of experience across engineering, DevOps, and security. Lukas brings substantial engineering and recent hands-on AI-integration experience, including work with startups and complex environments. That experience informs workflow, integration, model and evaluation, testing, observability, cost-control, and handoff choices for a focused implementation.",
        changingAI:
          "Evaluate model and tool changes against representative cases, observed behavior, and cost for the agreed workflow rather than assuming every new option is an improvement.",
        costApproach:
          "Start with one useful workflow and make budgets, rate limits, model choices, and usage visibility explicit. This supports informed operating decisions without promising savings or ROI.",
        inHouseHandoff:
          "Theory Foundry can establish a focused first implementation and a documented testing and control baseline that an internal engineering team can understand and continue.",
        nextStep: `For a clear integration inquiry, email ${THEORY_FOUNDRY.contactEmail} to request an exploratory call. The email starts a conversation; it does not book a meeting.`,
      },
      null,
      2,
    ),
  {
    name: "get_service_catalog",
    description:
      "Returns Theory Foundry service offerings, ideal fit, scoped delivery approach, safeguards, and common integration outcomes.",
    schema: z.object({}),
  },
);
