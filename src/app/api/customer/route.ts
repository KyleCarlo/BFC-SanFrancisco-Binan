import { NextResponse, NextRequest } from "next/server";
import db from "@lib/db";
import dayjs from "@lib/dayjs";
import { nanoid } from "nanoid";
import * as argon2 from "argon2";

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id") as string;
  if (!id) {
    return NextResponse.json(
      { message: "Invalid Customer ID." },
      { status: 400 }
    );
  }

  try {
    const customer = await db
      .selectFrom("Customer")
      .select([
        "id",
        "email",
        "created_at",
        "first_name",
        "last_name",
        "birthday",
        "points",
      ])
      .where("id", "=", id)
      .execute();

    if (customer.length === 0) {
      return NextResponse.json(
        { message: "Customer Not Found." },
        { status: 404 }
      );
    }

    return NextResponse.json({ customer: customer[0] }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to Fetch Customer Details." },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  if (!body.customer) {
    return NextResponse.json(
      { message: "Invalid Request. Please Include Customer Details." },
      { status: 400 }
    );
  }

  if (!body.otp) {
    return NextResponse.json(
      { message: "Invalid Request. Please Include OTP." },
      { status: 400 }
    );
  }

  const { customer, otp } = body;

  if (
    !customer ||
    !customer.email ||
    !customer.password ||
    !customer.first_name ||
    !customer.last_name
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
      .where("email", "=", customer.email)
      .execute();

    if (user.length > 0) {
      return NextResponse.json(
        { message: "Email Already Exists." },
        { status: 400 }
      );
    }

    const userOTP = await db
      .selectFrom("OTP")
      .select("otp")
      .where("email", "=", customer.email)
      .execute();

    if (userOTP.length === 0) {
      return NextResponse.json(
        { message: "Invalid OTP. Please Request for OTP Again." },
        { status: 400 }
      );
    }

    if (!(await argon2.verify(userOTP[0].otp, otp))) {
      return NextResponse.json({ message: "Invalid OTP." }, { status: 400 });
    }

    const hashedPassword = await argon2.hash(customer.password);
    await db
      .insertInto("Customer")
      .values({
        ...customer,
        password: hashedPassword,
        birthday: dayjs(customer.birthday).tz("Asia/Manila").toDate(),
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

export async function PATCH(req: NextRequest) {
  const body = await req.json();

  if (!body || !body.id || !body.total_price) {
    return NextResponse.json(
      {
        message: "Invalid Request. Please Include Customer ID and total price.",
      },
      { status: 400 }
    );
  }

  try {
    const customer = await db
      .selectFrom("Customer")
      .select(["id", "points"])
      .where("id", "=", body.id)
      .execute();

    if (customer.length === 0) {
      return NextResponse.json(
        { message: "Invalid Customer ID. Customer Not Found." },
        { status: 400 }
      );
    }

    const calculatedPoints =
      Math.floor(body.total_price / 20) + customer[0].points;
    await db
      .updateTable("Customer")
      .where("id", "=", body.id)
      .set("points", calculatedPoints)
      .execute();

    return NextResponse.json(
      { message: "Customer Points Successfully Updated." },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to Update Profile." },
      { status: 500 }
    );
  }
}
