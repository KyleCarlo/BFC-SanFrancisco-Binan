import { NextResponse, NextRequest } from "next/server";
import db from "@lib/db";
import dayjs from "@lib/dayjs";
import { nanoid } from "nanoid";
import * as argon2 from "argon2";
import { Cart } from "@models/Cart";
import { Voucher } from "@models/Voucher";

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

  if (!body || !body.id || !body.items) {
    return NextResponse.json(
      {
        message: "Invalid Request. Please Include Customer ID and Order Items.",
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

    const beverageCart = (body.items as Cart).filter(
      (item) => item.itemType === "beverage"
    );

    if (beverageCart.length === 0) {
      return NextResponse.json(
        { message: "No Beverage in Cart." },
        { status: 400 }
      );
    }

    const beverage = await db
      .selectFrom("BeverageVariation")
      .select(["id", "price"])
      .where(
        "id",
        "in",
        beverageCart.map((item) => item.variation_id)
      )
      .execute();

    if (beverage.length === 0) {
      return NextResponse.json(
        { message: "No Beverage Exist." },
        { status: 400 }
      );
    }

    let earnedPoints = 0;
    beverageCart.forEach((item) => {
      const unit = beverage.find((bev) => {
        return bev.id === item.variation_id;
      });

      if (unit) earnedPoints += unit.price * item.quantity;
    });
    earnedPoints = Math.floor(earnedPoints / 20) / 100;

    if (earnedPoints + customer[0].points < 100) {
      await db
        .updateTable("Customer")
        .where("id", "=", body.id)
        .set("points", earnedPoints + customer[0].points)
        .execute();

      return NextResponse.json(
        {
          message: `Customer ${customer[0].id} Earned ${earnedPoints} Points.`,
        },
        { status: 200 }
      );
    }

    const num_of_vouchers = Math.floor(
      (earnedPoints + customer[0].points) / 100
    );
    const pointsLeft = (earnedPoints + customer[0].points) % 100;
    const vouchers: Voucher[] = [];
    for (let i = 0; i < num_of_vouchers; i++) {
      vouchers.push({
        id: nanoid(),
        customer_id: body.id,
        valid_until: dayjs().tz("Asia/Manila").add(2, "month").toDate(),
      });
    }
    await db.insertInto("Voucher").values(vouchers).execute();
    await db
      .updateTable("Customer")
      .where("id", "=", body.id)
      .set("points", pointsLeft)
      .execute();

    return NextResponse.json(
      {
        message: `Customer ${customer[0].id} Earned ${num_of_vouchers} Voucher${
          num_of_vouchers > 1 ? "s" : ""
        }.`,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to Update Customer Points." },
      { status: 500 }
    );
  }
}
