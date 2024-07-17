import { z } from "zod";

export const MOPModel = z.object({
  id: z.number(),
  acct_name: z.string().min(1),
  bank_name: z.string().min(1),
  available: z.coerce.boolean(),
  qr_code: z.string(),
});

export type MOP = z.infer<typeof MOPModel>;
