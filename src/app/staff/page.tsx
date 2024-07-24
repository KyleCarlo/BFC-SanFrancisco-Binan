import { cookies } from "next/headers";
import SignInForm from "@components/signInForm";
import { decrypt } from "@lib/auth";
import { UserSession } from "@models/User";

export default async function StaffHomePage() {
  const session = cookies().get("bfc-sfb-session");

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

  return (
    <main>
      <h1>Staffs</h1>
    </main>
  );
}
