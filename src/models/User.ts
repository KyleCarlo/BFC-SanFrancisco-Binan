import { z } from "zod";

export const StaffRoleModel = z.enum(["Admin", "Employee", "Dev"]);

export const StaffModel = z.object({
  id: z.string(),
  email: z.string().email(),
  password: z.string(),
  name: z.string(),
  role: StaffRoleModel,
});

export const CustomerModel = z.object({
  id: z.string(),
  email: z.string().email(),
  points: z.number().default(0),
  password: z.string(),
  name: z.string(),
});

export const LoginModel = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type StaffRole = z.infer<typeof StaffRoleModel>;
export type Staff = z.infer<typeof StaffModel>;
export type Customer = z.infer<typeof CustomerModel>;
export type Login = z.infer<typeof LoginModel>;
