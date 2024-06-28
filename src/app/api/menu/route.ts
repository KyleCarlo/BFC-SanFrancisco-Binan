import { NextRequest, NextResponse } from "next/server";
import db from "@lib/db";
import { ItemType, ItemTypeModel } from "@models/Menu";
import { capitalize } from "@lib/utils";

// GET MENU LISTS
export async function GET(req: NextRequest) {
  const itemType = req.nextUrl.searchParams.get("itemType") as ItemType;
  const properItemTypes = Object.keys(ItemTypeModel.Values);

  if (!properItemTypes.includes(itemType)) {
    return NextResponse.json({ message: "Invalid item type" }, { status: 400 });
  }

  const items = await db
    .selectFrom(`${capitalize(itemType)}`)
    .selectAll()
    .orderBy("name", "asc")
    .execute();

  const itemVariations = await db
    .selectFrom(`${capitalize(itemType)}Variation`)
    .selectAll()
    .orderBy("price", "asc")
    .execute();

  items.forEach((item) => {
    Object.assign(item, {
      variations: itemVariations.filter((v) => v[`${itemType}_id`] === item.id),
    });
  });

  return NextResponse.json({ items }, { status: 200 });
}

// SET AVAILABILITY
export async function PATCH(req: NextRequest) {
  const {
    available,
    id,
    variation_id,
    itemType,
  }: {
    available: number;
    id: number;
    variation_id: number;
    itemType: ItemType;
  } = await req.json();

  try {
    await db
      .updateTable(`${capitalize(itemType)}Variation`)
      .where("id", "=", variation_id)
      .where(`${itemType}_id`, "=", id)
      .set("available", available)
      .execute();

    return NextResponse.json({ message: "Item updated." }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error Updating." }, { status: 500 });
  }
}
