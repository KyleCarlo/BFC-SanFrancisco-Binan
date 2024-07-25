import { Staff } from "@models/User";

export default async function getStaffs() {
  try {
    const response = await fetch(`http://localhost:3000/api/staff`, {
      method: "GET",
      next: {
        revalidate: 1,
      },
    });

    const { staff, message } = (await response.json()) as {
      staff: Staff[];
      message: string;
    };

    if (!response.ok) {
      return { message };
    }

    const admins = staff.filter((s) => s.role === "Admin");
    const devs = staff.filter((s) => s.role === "Dev");
    const employees = staff.filter((s) => s.role === "Employee");

    return { staff: [...admins, ...devs, ...employees], message };
  } catch (error) {
    console.log(error);
    return { message: "Error Fetching Staff." };
  }
}
