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
        commonProblems: RJLS.problems,
        bestFit:
          "Business leaders who want practical control over AI usage, secure developer integrations, reliable outputs, and visible AI spend.",
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
