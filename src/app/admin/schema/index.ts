import { z } from "zod/v4";
import { ROLES } from "@/constants";

export const schema = z.object({
  role: z.string(),
});

export const initialUserFormValues = {
  role: ROLES.USER,
};
