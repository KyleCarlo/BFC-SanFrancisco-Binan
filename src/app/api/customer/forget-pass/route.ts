import db from "@/src/lib/db";
import { NextRequest, NextResponse } from "next/server";
import * as argon2 from "argon2";
import dayjs from "dayjs";

export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get("email") as string;
  if (!email) {
    return NextResponse.json(
      { message: "Invalid Email Address." },
      { status: 400 }
    );
  }

  try {
    const user = await db
      .selectFrom("Customer")
      .select(["id", "email"])
      .where("email", "=", email)
      .execute();

    if (!user[0]) {
      return NextResponse.json({ message: "User not found." }, { status: 404 });
    }

    // CHECK HERE IF LAST RESET IS AFTER A DAY
    // if (user[0].last_reset) {
    //   const lastResetTimestamp = dayjs(user[0].last_reset);
    //   const now = dayjs();

    //   if (disabledTimestamp.add(1, "day").isAfter(now)) {
    //     return NextResponse.json(
    //       { message: "Password must be at least one day old before reset." },
    //       { status: 403 }
    //     );
    //   }
    // }

    const securityQuestion = await db
      .selectFrom("CustomerPass")
      .select("security_question_num")
      .where("customer_id", "=", user[0].id)
      .execute();

    return NextResponse.json(
      {
        user: user[0].email,
        securityQuestion: securityQuestion[0].security_question_num,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to recover password." },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const { email, answer } = await req.json();

  if (!email || !answer) {
    return NextResponse.json(
      { message: "All fields are required." },
      { status: 400 }
    );
  }

  try {
    const user = await db
      .selectFrom("Customer")
      .select("id")
      .where("email", "=", email)
      .executeTakeFirst();

    if (!user) {
      return NextResponse.json({ message: "User not found." }, { status: 404 });
    }

    const pass = await db
      .selectFrom("CustomerPass")
      .select("security_question_answer")
      .where("customer_id", "=", user.id)
      .executeTakeFirst();

    if (!pass)
      return NextResponse.json(
        { message: "Invalid security answer." }, //generic error message
        { status: 401 }
      );

    const isValid = await argon2.verify(pass.security_question_answer, answer);
    if (!isValid) {
      return NextResponse.json(
        { message: "Invalid security answer." },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { message: "Proceed to password reset." },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to reset password." },
      { status: 500 }
    );
  }
}
