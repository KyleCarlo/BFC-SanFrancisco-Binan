import { Staff } from "@models/User";
import { toast } from "sonner";
import { Dispatch, SetStateAction } from "react";

export default async function getStaffs(
  setStaffs: Dispatch<SetStateAction<Staff[]>>,
  setLoading: Dispatch<SetStateAction<boolean>>
) {
  setLoading(true);
  try {
    const response = await fetch(`/api/staff`, {
      method: "GET",
    });

    const { staff, message } = (await response.json()) as {
      staff: Staff[];
      message: string;
    };

    if (!response.ok) {
      setLoading(false);
      return toast.error(message);
    }

    const admins = staff.filter((s) => s.role === "Admin");
    const devs = staff.filter((s) => s.role === "Dev");
    const employees = staff.filter((s) => s.role === "Employee");

    setStaffs([...admins, ...devs, ...employees]);
    setLoading(false);
  } catch {
    setStaffs([]);
    setLoading(false);
    toast.error("Unknown Error Occurred.");
  }
}
