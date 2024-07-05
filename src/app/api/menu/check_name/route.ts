import { NextRequest, NextResponse } from "next/server";
import db from "@lib/db";
import { capitalize, validateItemType } from "@lib/utils";
import { ItemType } from "@models/Menu";

export async function GET(req: NextRequest) {
  const itemName = req.nextUrl.searchParams.get("name") as string;
  const itemType = req.nextUrl.searchParams.get("itemType") as ItemType;
  const isValid = validateItemType(itemType);

  if (!isValid) {
    return NextResponse.json({ message: "Invalid Item Type" }, { status: 400 });
  }
  const existing = await db
    .selectFrom(`${capitalize(itemType)}` as "Food" | "Beverage")
    .select("name")
    .where("name", "=", itemName)
    .execute();

  if (existing.length > 0) {
    return NextResponse.json(
      { message: `${itemName} Already Exists. Please Rename.` },
      { status: 400 }
    );
  }

  return NextResponse.json(
    { message: "Item Name Available." },
    { status: 200 }
  );
}
