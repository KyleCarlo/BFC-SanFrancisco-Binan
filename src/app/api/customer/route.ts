import { NextResponse, NextRequest } from "next/server";
import db from "@lib/db";
import dayjs from "@lib/dayjs";
import { nanoid } from "nanoid";
import * as argon2 from "argon2";

export async function POST(req: NextRequest) {
  const body = await req.json();

  if (
    !body ||
    !body.email ||
    !body.password ||
    !body.first_name ||
    !body.last_name
  ) {
    return NextResponse.json(
      { message: "Email, Password, First Name, and Last Name are Required." },
      { status: 400 }
    );
  }

  try {
    const user = await db
      .selectFrom("Customer")
      .select("email")
      .where("email", "=", body.email)
      .execute();

    if (user.length > 0) {
      return NextResponse.json(
        { message: "Email Already Exists." },
        { status: 400 }
      );
    }

    const hashedPassword = await argon2.hash(body.password);
    await db
      .insertInto("Customer")
      .values({
        ...body,
        password: hashedPassword,
        id: nanoid(),
        created_at: dayjs().tz("Asia/Manila").toDate(),
      })
      .execute();

    return NextResponse.json(
      { message: "Sign Up Successful." },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to Sign Up." },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {}
