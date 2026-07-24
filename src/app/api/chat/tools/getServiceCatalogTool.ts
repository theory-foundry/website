import { tool } from "@langchain/core/tools";
import { z } from "zod";
import { RJLS } from "@/constants/RJLS";

export const getServiceCatalogTool = tool(
  async () =>
    JSON.stringify(
      {
        companyName: RJLS.companyName,
        tagline: RJLS.tagline,
        services: RJLS.services,
        commonOutcomes: RJLS.integrationOutcomes,
        exampleUseCases: RJLS.useCases,
        safeguards: RJLS.safeguards,
        bestFit:
          "Founders and technical teams at small product companies whose existing applications or services already contain meaningful data and workflows.",
        delivery:
          "RJLS can design and build a focused, domain-aware AI interface: the user experience, connected AI service, and scoped connections to approved APIs, tools, and business data. Existing identity, permissions, validation, and business rules remain authoritative, while testing, logging, observability, cost controls, and failure paths are defined for the agreed workflow and operating environment.",
        nextStep:
          `For a clear integration inquiry, email ${RJLS.contactEmail} to request an exploratory call. The email starts a conversation; it does not book a meeting.`,
      },
      null,
      2,
    ),
  {
    name: "get_service_catalog",
    description:
      "Returns RJLS Systems service offerings, ideal fit, scoped delivery approach, safeguards, and common integration outcomes.",
    schema: z.object({}),
  },
);
