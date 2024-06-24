import { NextRequest, NextResponse } from "next/server";
import db from "@lib/db";
import { ItemType } from "@models/Menu";

function capitalize(word: string) {
  return (word.charAt(0).toUpperCase() + word.slice(1)) as "Food" | "Beverage";
}

export async function GET(req: NextRequest) {
  const itemType = req.nextUrl.searchParams.get("itemType") as ItemType;
  const properItemTypes: ItemType[] = ["food", "beverage"];

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
