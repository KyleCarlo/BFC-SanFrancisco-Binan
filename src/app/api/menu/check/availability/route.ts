import { NextRequest, NextResponse } from "next/server";
import db from "@lib/db";

export async function POST(req: NextRequest) {
  const { food, beverage }: { food: number[]; beverage: number[] } =
    await req.json();

  try {
    let foodItems;
    let beverageItems;

    if (food.length > 0)
      foodItems = await db
        .selectFrom("FoodVariation")
        .select(["id", "available"])
        .where("id", "in", food)
        .execute();
    if (beverage.length > 0)
      beverageItems = await db
        .selectFrom("BeverageVariation")
        .select(["id", "available"])
        .where("id", "in", beverage)
        .execute();

    return NextResponse.json(
      { available_beverage: beverageItems, available_food: foodItems },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to Check Item Availability." },
      { status: 400 }
    );
  }
}
