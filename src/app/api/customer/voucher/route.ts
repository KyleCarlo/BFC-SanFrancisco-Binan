import { NextRequest, NextResponse } from "next/server";
import db from "@lib/db";
import dayjs from "@lib/dayjs";

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id") as string;
  if (!id) {
    return NextResponse.json(
      { message: "Invalid Customer ID." },
      { status: 400 }
    );
  }

  try {
    const vouchers = await db
      .selectFrom("Voucher")
      .selectAll()
      .where("customer_id", "=", id)
      .orderBy("valid_until", "asc")
      .execute();

    return NextResponse.json({ vouchers }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to Fetch Customer Vouchers." },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  const body = await req.json();

  if (!body || !body.voucher_details) {
    return NextResponse.json(
      { message: "Invalid Voucher Details." },
      { status: 400 }
    );
  }

  const { voucher_details } = body;

  try {
    const current_date = dayjs().tz("Asia/Manila");
    const parsed_details = JSON.parse(voucher_details);

    const { id, customer_id } = parsed_details as {
      id: string;
      customer_id: string;
    };

    const voucher = await db
      .selectFrom("Voucher")
      .selectAll()
      .where("id", "=", id)
      .where("customer_id", "=", customer_id)
      .execute();

    if (voucher.length === 0) {
      return NextResponse.json(
        { message: "Voucher Not Found." },
        { status: 404 }
      );
    }

    const { valid_until } = voucher[0];
    const parsed_valid_until = dayjs(valid_until).tz("Asia/Manila");

    if (current_date.isAfter(parsed_valid_until)) {
      return NextResponse.json(
        { message: "Voucher is Expired." },
        { status: 400 }
      );
    }

    await db
      .deleteFrom("Voucher")
      .where("id", "=", id)
      .where("customer_id", "=", customer_id)
      .execute();

    return NextResponse.json(
      { message: "Voucher Availed Successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to Avail Voucher." },
      { status: 400 }
    );
  }
}
