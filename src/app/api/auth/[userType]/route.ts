import { NextRequest, NextResponse } from "next/server";
import db from "@lib/db";
import { capitalize } from "@lib/utils";
import { cookies } from "next/headers";
import dayjs from "@lib/dayjs";
import { encrypt } from "@lib/auth";
import * as argon2 from "argon2";

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
      .select(["id", "email", "role", "first_name", "last_name", "password"])
      .where("email", "=", body.email)
      .execute();

    if (user.length === 0) {
      return NextResponse.json({ message: "Invalid Email." }, { status: 400 });
    }

    if (user[0].role === "Customer") {
      const isValid = await argon2.verify(user[0].password, body.password);
      if (!isValid) {
        return NextResponse.json(
          { message: "Invalid Password." },
          { status: 400 }
        );
      }
    } else {
      if (user[0].password !== body.password) {
        return NextResponse.json(
          { message: "Invalid Password." },
          { status: 400 }
        );
      }
    }

    const days = ["Admin", "Dev", "Customer"].includes(user[0].role) ? 30 : 1;
    const expires = dayjs().tz("Asia/Manila").add(days, "days").toDate();
    const session = await encrypt({ user: user[0], expires }, days);

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
