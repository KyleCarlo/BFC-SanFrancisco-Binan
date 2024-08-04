import { NextResponse, NextRequest } from "next/server";
import db from "@lib/db";
import { customAlphabet } from "nanoid";
import * as argon2 from "argon2";
import dayjs from "@lib/dayjs";
import { deleteOTP } from "@lib/_cron";
import { OTPmessage, transporter } from "@lib/email";

export async function POST(req: NextRequest) {
  const body = await req.json();

  if (!body.email) {
    return NextResponse.json(
      { message: "Email is Required." },
      { status: 400 }
    );
  }
  if (!body.first_name) {
    return NextResponse.json(
      { message: "First Name is Required." },
      { status: 400 }
    );
  }

  const otp = customAlphabet("1234567890", 6);
  const generated = otp();

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

    const userOTP = await db
      .selectFrom("OTP")
      .select("created_at")
      .where("email", "=", body.email)
      .execute();

    if (userOTP.length > 0) {
      const created_at = dayjs(userOTP[0].created_at).tz("Asia/Manila");
      const end_at = created_at.add(
        parseInt(process.env.OTP_EXPIRY as string),
        "millisecond"
      );
      const now = dayjs().tz("Asia/Manila");
      const time_remaining = end_at.diff(now, "second");

      return NextResponse.json(
        {
          message: `Please wait ${time_remaining} seconds before registering again.`,
        },
        { status: 400 }
      );
    }
    await db
      .insertInto("OTP")
      .values({
        email: body.email,
        otp: await argon2.hash(generated),
        created_at: dayjs().tz("Asia/Manila").toDate(),
      })
      .execute();

    await transporter.sendMail({
      from: '"But First Coffee - San Francisco Biñan" <no-reply@bfc-sfb.com>', // sender address
      to: body.email, // list of receivers
      subject: "Account Confirmation OTP", // Subject line
      html: OTPmessage(body.first_name, generated),
    });

    deleteOTP(body.email);

    return NextResponse.json({ message: "OTP Generated" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to Generate OTP." },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  const body = await req.json();

  if (!body.email) {
    return NextResponse.json(
      { message: "Email is Required." },
      { status: 400 }
    );
  }

  try {
    await db.deleteFrom("OTP").where("email", "=", body.email).execute();

    return NextResponse.json({ message: "OTP Deleted" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to Delete OTP." },
      { status: 500 }
    );
  }
}
