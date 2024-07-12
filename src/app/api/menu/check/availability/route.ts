import { NextRequest, NextResponse } from "next/server";
import db from "@lib/db";
import { validateItemType } from "@lib/staff-utils";
import { ItemType } from "@models/Menu";
import { capitalize } from "@lib/utils";

export async function GET(req: NextRequest) {
  const id = Number(req.nextUrl.searchParams.get("id") as string);
  const variation_id = Number(
    req.nextUrl.searchParams.get("variation_id") as string
  );
  const itemType = req.nextUrl.searchParams.get("itemType") as ItemType;
  const isValid = validateItemType(itemType);
  if (!isValid) {
    return NextResponse.json({ message: "Invalid Item Type" }, { status: 400 });
  }
  if (!id) {
    return NextResponse.json({ message: "Invalid Item ID" }, { status: 400 });
  }
  if (!variation_id) {
    return NextResponse.json(
      { message: "Invalid Variation ID" },
      { status: 400 }
    );
  }

  try {
    const items = await db
      .selectFrom(
        `${capitalize(itemType)}Variation` as
          | "FoodVariation"
          | "BeverageVariation"
      )
      .select("available")
      .where(`${itemType}_id`, "=", id)
      .where("id", "=", variation_id)
      .execute();

    if (items.length === 0) {
      return NextResponse.json(
        { found: false, available: false },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { found: true, available: items[0].available == 1 ? true : false },
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
