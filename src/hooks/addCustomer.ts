import { SignUp } from "@models/User";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { toast } from "sonner";

export default async function addCustomer(
  customer: SignUp,
  router: AppRouterInstance
) {
  try {
    const response = await fetch("/api/customer", {
      method: "POST",
      body: JSON.stringify(customer),
    });
    const { message } = await response.json();
    if (!response.ok) {
      return toast.error(message);
    }

    router.push("/sign-in");
  } catch {
    return toast.error("Unknown Error Occured.");
  }
}
