import { NextResponse, NextRequest } from "next/server";
import { decrypt } from "@lib/auth";
import { StaffRoleModel } from "@models/User";
import { UserSession } from "@models/User";

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/staff/")) {
    const session = request.cookies.get("bfc-sfb-session");
    if (!session) {
      return NextResponse.redirect(new URL("/staff", request.url));
    }
    const { user } = (await decrypt(session.value)) as { user: UserSession };
    if (!Object.keys(StaffRoleModel.Values).includes(user.role))
      return NextResponse.redirect(new URL("/staff", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
