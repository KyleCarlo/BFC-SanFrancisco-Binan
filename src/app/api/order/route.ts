import { NextRequest, NextResponse } from "next/server";
import dayjs from "@lib/dayjs";
import db from "@lib/db";

export async function GET(req: NextRequest) {
  const order_id = req.nextUrl.searchParams.get("id") as string;

  if (!order_id) {
    return NextResponse.json({ message: "Invalid Order ID." }, { status: 400 });
  }

  try {
    const order = await db
      .selectFrom("Order")
      .selectAll()
      .where("id", "=", order_id)
      .execute();

    if (order.length === 0) {
      return NextResponse.json(
        { message: "Order Not Found." },
        { status: 404 }
      );
    }

    return NextResponse.json({ order }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error Fetching Order." },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  body.created_at = dayjs().tz("Asia/Manila").toDate();

  try {
    await db
      .insertInto("Order")
      .values({
        ...body,
        items: JSON.stringify(body.items),
        receiver_details: JSON.stringify(body.receiver_details),
      })
      .execute();

    return NextResponse.json(
      { message: "Successfully Submitted Order." },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error submitting order." },
      { status: 500 }
    );
  }
}
