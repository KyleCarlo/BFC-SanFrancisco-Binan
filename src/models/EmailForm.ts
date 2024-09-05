import { z } from "zod";

export const EmailFormModel = z.object({
  name: z.string().min(1, "Required"),
  email: z.string().email(),
  phone_number: z
    .string()
    .min(1, "Required")
    .regex(/^[\d\s]+$/),
  message: z.string().min(1, "Required"),
});

export type EmailForm = z.infer<typeof EmailFormModel>;
