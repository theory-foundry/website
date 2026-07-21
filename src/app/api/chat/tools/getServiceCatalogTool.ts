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
          "Businesses that want a customer-facing or internal AI chat interface connected to an existing website, application, API, document workflow, or database-backed system.",
        delivery:
          "RJLS can design and build the complete integration: the user experience, AI service, connections to approved APIs and business data, authentication-aware controls, testing, monitoring, and production support.",
      },
      null,
      2,
    ),
  {
    name: "get_service_catalog",
    description:
      "Returns RJLS Systems service offerings, positioning, ideal client fit, and common business problems the firm solves.",
    schema: z.object({}),
  },
);
