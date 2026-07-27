import { tool } from "@langchain/core/tools";
import { z } from "zod";
import { RJLS } from "@/constants/RJLS";

export const getContactInfoTool = tool(async () => JSON.stringify(
  {
    companyName: RJLS.companyName,
    email: RJLS.contactEmail,
    website: RJLS.website,
    intent: RJLS.primaryCta,
    nextStep:
      "Email RJLS with the product, users, and workflow you want to improve. The email starts an exploratory conversation; it does not book or schedule a meeting.",
  },
  null,
  2,
), {
  name: "get_contact_info",
  description:
    "Returns RJLS Systems contact information. Use whenever the user asks how to reach RJLS or start a conversation.",
  schema: z.object({}),
});
