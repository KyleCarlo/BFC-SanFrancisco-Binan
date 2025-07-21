import db from "@/src/lib/db";
import { NextRequest, NextResponse } from "next/server";

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

    if (!user) {
      return NextResponse.json({ message: "User not found." }, { status: 404 });
    }

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
  const { email, answer, newPassword } = await req.json();

  if (!email || !answer || !newPassword) {
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

    // Here you would validate the answer and update the password
    // This is a placeholder for the actual logic
    // await updatePassword(user.id, newPassword);

    return NextResponse.json(
      { message: "Password reset successfully." },
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
