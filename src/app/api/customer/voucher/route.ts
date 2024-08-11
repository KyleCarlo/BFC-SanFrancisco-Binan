import { NextRequest, NextResponse } from "next/server";
import db from "@lib/db";

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
