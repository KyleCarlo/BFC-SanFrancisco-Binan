import { NextRequest, NextResponse } from "next/server";
import db from "@lib/db";
import { capitalize } from "@lib/utils";
import { cookies } from "next/headers";
import dayjs from "@lib/dayjs";
import { encrypt } from "@lib/auth";

export async function POST(
  req: NextRequest,
  { params }: { params: { userType: "customer" | "staff" } }
) {
  const body: { email: string; password: string } = await req.json();

  if (!body || !body.email || !body.password) {
    return NextResponse.json(
      { message: "Email and Password are Required." },
      { status: 400 }
    );
  }

  if (params.userType !== "customer" && params.userType !== "staff") {
    return NextResponse.json(
      { message: "Invalid User Type." },
      { status: 400 }
    );
  }

  try {
    const user = await db
      .selectFrom(capitalize(params.userType) as "Customer" | "Staff")
      .select(["id", "email", "role"])
      .where("email", "=", body.email)
      .where("password", "=", body.password)
      .execute();

    if (user.length === 0) {
      return NextResponse.json(
        { message: "Invalid Credentials." },
        { status: 400 }
      );
    }

    const expires = dayjs().tz("Asia/Manila").add(30, "second").toDate();
    const session = await encrypt({ user: user[0], expires });

    cookies().set("bfc-sfb-session", session, { expires, httpOnly: true });
    return NextResponse.json({ message: "Login Successful." });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to Sign In." },
      { status: 500 }
    );
  }
}
