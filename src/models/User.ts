import { z } from "zod";

export const StaffRoleModel = z.enum(["Admin", "Employee", "Dev"]);

export const StaffModel = z.object({
  id: z.string(),
  email: z.string().email(),
  first_name: z.string(),
  last_name: z.string(),
  role: StaffRoleModel,
});

export const CustomerModel = z.object({
  id: z.string(),
  email: z.string().email(),
  first_name: z.string(),
  last_name: z.string(),
  birthday: z.date(),
  points: z.number().default(0),
  created_at: z.date(),
});

export const LoginModel = z.object({
  email: z.string().email(),
  password: z.string().min(1, "Required").max(255, "Maximum of 255 characters"),
});

export const SignUpModel = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, "Minimum of 8 characters")
    .max(50, "Maximum of 50 characters"),
  first_name: z.string().min(1, "Required").max(50, "Maximum of 50 characters"),
  last_name: z.string().min(1, "Required").max(50, "Maximum of 50 characters"),
  birthday: z.date().optional(),
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
export type SignUp = z.infer<typeof SignUpModel>;
export type UserSession = z.infer<typeof UserSessionModel>;
