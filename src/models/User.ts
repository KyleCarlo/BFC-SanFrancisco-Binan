export type UserRole = "admin" | "staff" | "customer";
export interface User {
  id: number;
  email: string;
  password: string;
  name: string;
  role: UserRole;
}
