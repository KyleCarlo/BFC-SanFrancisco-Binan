import { NextResponse, NextRequest } from "next/server";
import { decrypt } from "@lib/auth";
import { StaffRoleModel } from "@models/User";
import { UserSession } from "@models/User";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const session = request.cookies.get("bfc-sfb-session");

  if (path.startsWith("/staff") && path !== "/staff/sign-in") {
    if (!session) {
      return NextResponse.redirect(new URL("/staff/sign-in", request.url));
    }
    const { user } = (await decrypt(session.value)) as { user: UserSession };
    if (!Object.keys(StaffRoleModel.Values).includes(user.role))
      return NextResponse.redirect(new URL(`/account/${user.id}`, request.url));
  } else if (path === "/staff/sign-in" && session) {
    const { user } = (await decrypt(session.value)) as { user: UserSession };
    if (!Object.keys(StaffRoleModel.Values).includes(user.role))
      return NextResponse.redirect(new URL(`/account/${user.id}`, request.url));
    else return NextResponse.redirect(new URL("/staff", request.url));
  }
  if (path === "/api/menu" && request.method != "GET") {
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const { user } = (await decrypt(session.value)) as { user: UserSession };
    if (
      !["Admin", "Dev", "Employee"].includes(user.role) &&
      request.method === "PATCH"
    ) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    if (!["Admin", "Dev"].includes(user.role) && request.method !== "PATCH") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
  }
  if (path.startsWith("/account")) {
    if (!session)
      return NextResponse.redirect(new URL("/sign-in", request.url));

    const { user } = (await decrypt(session.value)) as { user: UserSession };
    if (user.role === "Customer" && path !== `/account/${user.id}`)
      return NextResponse.redirect(new URL(`/account/${user.id}`, request.url));

    if (["Admin", "Employee"].includes(user.role))
      return NextResponse.redirect(new URL("/staff", request.url));
  }

  if (
    ["/api/customer", "/api/customer/voucher"].includes(path) &&
    request.method === "GET"
  ) {
    const id = request.nextUrl.searchParams.get("id");
    if (!id) {
      return NextResponse.json(
        { message: "Invalid Customer ID." },
        { status: 400 }
      );
    }
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const { user } = (await decrypt(session.value)) as { user: UserSession };
    if (user.role === "Customer" && id !== user.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    if (["Admin", "Employee"].includes(user.role))
      return NextResponse.redirect(new URL("/staff", request.url));
  }

  if (
    (path === "/api/customer" && request.method === "PATCH") ||
    (path === "/api/customer/voucher" && request.method === "DELETE")
  ) {
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const { user } = (await decrypt(session.value)) as { user: UserSession };
    if (!["Admin", "Employee", "Dev"].includes(user.role)) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|icon.ico).*)",
    "/staff/:path*",
    "/account/:id*",
    "/api/:path*",
  ],
};
