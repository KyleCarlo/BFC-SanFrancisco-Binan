import { NextRequest, NextResponse } from "next/server";
import dayjs from "@lib/dayjs";
import db from "@lib/db";
import { OrderStatusModel, OrderStatus } from "@models/Order";
import { capitalize } from "@lib/utils";

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

    order[0].total_price /= 100;

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
  const done = req.nextUrl.searchParams.get("done") as string;
  const body = await req.json();
  body.created_at = dayjs().tz("Asia/Manila").toDate();
  try {
    if (body.order_type === "PickUpLater") {
      body.scheduled = dayjs(body.scheduled).tz("Asia/Manila").toDate();
    }
    await db
      .insertInto(done === "true" ? "Order_Done" : "Order")
      .values({
        ...body,
        items: JSON.stringify(body.items),
        received_at:
          done === "true"
            ? dayjs(body.received_at).tz("Asia/Manila").toDate()
            : null,
        total_price: body.total_price * 100,
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

export async function PATCH(req: NextRequest) {
  const status = req.nextUrl.searchParams.get("status") as OrderStatus;
  const order_id = req.nextUrl.searchParams.get("id") as string;

  if (!order_id) {
    return NextResponse.json({ message: "Invalid Order ID." }, { status: 400 });
  }
  if (
    !status ||
    !Object.keys(OrderStatusModel.Values).includes(capitalize(status))
  ) {
    return NextResponse.json(
      { message: "Invalid Order Status." },
      { status: 400 }
    );
  }

  try {
    await db
      .updateTable("Order")
      .set({ status: capitalize(status) as OrderStatus })
      .where("id", "=", order_id)
      .execute();

    return NextResponse.json(
      { message: "Successfully Updated Order." },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error Updating Order." },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  const order_id = req.nextUrl.searchParams.get("id") as string;

  if (!order_id) {
    return NextResponse.json({ message: "Invalid Order ID." }, { status: 400 });
  }

  try {
    await db.deleteFrom("Order").where("id", "=", order_id).execute();

    return NextResponse.json(
      { message: "Successfully Deleted Order." },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error Deleting Order." },
      { status: 500 }
    );
  }
}
