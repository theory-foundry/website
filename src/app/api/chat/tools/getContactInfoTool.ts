import { tool } from "@langchain/core/tools";
import { z } from "zod";
import { THEORY_FOUNDRY } from "@/constants/TheoryFoundry";

export const getContactInfoTool = tool(
  async () =>
    JSON.stringify(
      {
        companyName: THEORY_FOUNDRY.companyName,
        email: THEORY_FOUNDRY.contactEmail,
        website: THEORY_FOUNDRY.website,
        intent: THEORY_FOUNDRY.primaryCta,
        nextStep:
          "Email Theory Foundry with the product, users, and workflow you want to improve. The email starts an exploratory conversation; it does not book or schedule a meeting.",
      },
      null,
      2,
    ),
  {
    name: "get_contact_info",
    description:
      "Returns Theory Foundry contact information. Use whenever the user asks how to reach Theory Foundry or start a conversation.",
    schema: z.object({}),
  },
);
