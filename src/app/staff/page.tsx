import { cookies } from "next/headers";
import SignInForm from "@components/signInForm";
import { decrypt } from "@lib/auth";
import { UserSession } from "@models/User";
import StaffList from "@components/staff/staffTable";
import { redirect } from "next/navigation";
import getStaffs from "@hooks/getStaffs";

export default async function StaffHomePage() {
  const session = cookies().get("bfc-sfb-session");
  const { staff, message } = await getStaffs();

  if (!session) {
    return (
      <div className="flex flex-col justify-center items-center h-[100dvh]">
        <h1 className="text-bold text-italic text-xl mb-5 text-gold">
          BFC Staff Login
        </h1>
        <SignInForm role="staff" />
      </div>
    );
  }

  const { user } = (await decrypt(session.value)) as { user: UserSession };

  if (["Admin", "Dev", "Staff"].includes(user.role)) {
    return (
      <div>
        <StaffList staff={staff} message={message} />
      </div>
    );
  }

  redirect("/sign-in");
}
