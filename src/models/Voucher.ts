import { z } from "zod";

export const VoucherModel = z.object({
  id: z.string(),
  customer_id: z.string(),
  valid_until: z.date(),
});

export type Voucher = z.infer<typeof VoucherModel>;
