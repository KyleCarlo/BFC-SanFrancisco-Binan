import { NextRequest, NextResponse } from "next/server";
import { OrderStatus, OrderStatusModel } from "@models/Order";
import db from "@lib/db";
import { capitalize } from "@lib/utils";

export async function GET(
  req: NextRequest,
  { params }: { params: { status: OrderStatus } }
) {
  const { status } = params;

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
    const orders = await db
      .selectFrom("Order")
      .selectAll()
      .where("status", "=", capitalize(status) as OrderStatus)
      .orderBy("created_at", "asc")
      .execute();

    return NextResponse.json({ orders }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error Fetching Orders." },
      { status: 500 }
    );
  }
}
