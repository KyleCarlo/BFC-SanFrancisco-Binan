import { NextRequest, NextResponse } from "next/server";
import db from "@lib/db";

export async function PATCH(req: NextRequest) {
  const customerID = req.nextUrl.searchParams.get("id") as string;
  if (!customerID) {
    return { status: 400, json: { message: "Invalid Customer ID." } };
  }

  try {
    const customer = await db
      .selectFrom("Customer")
      .select("points")
      .where("id", "=", customerID)
      .execute();

    if (customer.length === 0) {
      return NextResponse.json(
        { message: "Customer Not Found." },
        { status: 404 }
      );
    }

    if (customer[0].points < 100) {
      return NextResponse.json(
        { message: "Insufficient Points to Avail Rewards." },
        { status: 400 }
      );
    }

    await db
      .updateTable("Customer")
      .set("points", customer[0].points - 100)
      .where("id", "=", customerID)
      .execute();

    return NextResponse.json(
      { message: "Successfully Availed Rewards." },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to Avail Rewards." },
      { status: 500 }
    );
  }
}
