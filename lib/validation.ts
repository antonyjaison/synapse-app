import { z } from "zod";

export const prescriptionSchema = z.array(
  z.object({
    name: z.string(),
    frequency: z.number().default(1),
    duration: z.number().default(1),
  })
);
