import { NextRequest, NextResponse } from "next/server";
import db from "@lib/db";
import { OrderStatus } from "@/src/models/Order";

export async function GET() {
  try {
    const order_count = await db
      .selectFrom("Order")
      .select(["status", (qb) => qb.fn.count("status").as("count")])
      .groupBy("status")
      .execute();
    const transform = order_count.reduce((acc, item) => {
      acc[item.status] = Number(item.count);
      return acc;
    }, {} as Record<OrderStatus, number>);
    return NextResponse.json({ order_count: transform }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error Fetching Order." },
      { status: 500 }
    );
  }
}
