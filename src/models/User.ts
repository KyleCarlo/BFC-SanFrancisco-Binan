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
  password: z.string(),
  name: z.string(),
  role: z.literal("Customer"),
  points: z.number().default(0),
});

export const LoginModel = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const UserSessionModel = z.object({
  id: z.string(),
  email: z.string().email(),
  role: z.union([StaffRoleModel, z.literal("Customer")]),
});

export type StaffRole = z.infer<typeof StaffRoleModel>;
export type Staff = z.infer<typeof StaffModel>;
export type Customer = z.infer<typeof CustomerModel>;
export type Login = z.infer<typeof LoginModel>;
export type UserSession = z.infer<typeof UserSessionModel>;
