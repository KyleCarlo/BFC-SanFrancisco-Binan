import { NextRequest, NextResponse } from "next/server";
import db from "@lib/db";
import { ItemType } from "@models/Menu";
import { capitalize } from "@lib/utils";
import { validateItemType, validateVariation } from "@lib/utils";
import { BeverageVariationModel } from "@/src/models/Menu/Beverage";
import { z } from "zod";

// GET MENU LISTS
export async function GET(req: NextRequest) {
  const itemType = req.nextUrl.searchParams.get("itemType") as ItemType;
  const isValid = validateItemType(itemType);

  if (!isValid) {
    return NextResponse.json({ message: "Invalid item type" }, { status: 400 });
  }

  try {
    const items = await db
      .selectFrom(`${capitalize(itemType)}` as "Food" | "Beverage")
      .selectAll()
      .orderBy("name", "asc")
      .execute();

    const itemVariations = await db
      .selectFrom(
        `${capitalize(itemType)}Variation` as
          | "FoodVariation"
          | "BeverageVariation"
      )
      .selectAll()
      .orderBy("price", "asc")
      .execute();

    items.forEach((item) => {
      Object.assign(item, {
        variations: itemVariations.filter(
          (v) => v[`${itemType}_id`] === item.id
        ),
      });
    });

    return NextResponse.json({ items }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error Fetching Menu Items." },
      { status: 500 }
    );
  }
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
      .updateTable(
        `${capitalize(itemType)}Variation` as
          | "FoodVariation"
          | "BeverageVariation"
      )
      .where("id", "=", variation_id)
      .where(`${itemType}_id`, "=", id)
      .set("available", available)
      .execute();

    return NextResponse.json(
      { message: "Item Availability updated." },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to Update Availability" },
      { status: 500 }
    );
  }
}

// ADD ITEM
export async function PUT(req: NextRequest) {
  const itemType = req.nextUrl.searchParams.get("itemType") as ItemType;
  const isValid = validateItemType(itemType);

  if (!isValid) {
    return NextResponse.json({ message: "Invalid Item Type" }, { status: 400 });
  }

  const body = await req.json();
  const variations = body.variations;
  delete body.variations;

  if (itemType === "beverage") {
    const { isValid, message } = validateVariation(variations, itemType);
    if (!isValid) {
      return NextResponse.json({ message }, { status: 400 });
    }
  }

  try {
    const existingNames = (
      await db
        .selectFrom(`${capitalize(itemType)}` as "Food" | "Beverage")
        .select("name")
        .execute()
    ).map((item) => item.name);

    if (existingNames.includes(body.name)) {
      return NextResponse.json(
        { message: "Item Name Already Exists. Please Rename." },
        { status: 400 }
      );
    }

    const inserted_item = await db
      .insertInto(`${capitalize(itemType)}` as "Food" | "Beverage")
      .values(body)
      .execute();

    BeverageVariationModel.pick({
      serving: true,
      price: true,
      concentrate: true,
      hot_cold: true,
    });

    type InputVariation = {
      serving: string;
      price: number;
      concentrate?: boolean;
      hot_cold?: string;
    };

    await db
      .insertInto(
        `${capitalize(itemType)}Variation` as
          | "FoodVariation"
          | "BeverageVariation"
      )
      .values(
        variations.map((variation: InputVariation) => ({
          ...variation,
          [`${itemType}_id`]: inserted_item[0].insertId,
        }))
      )
      .execute();

    return NextResponse.json({
      message: `${body.name} Successfully Added to ${capitalize(
        itemType
      )} Menu.`,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to Add Item." },
      { status: 500 }
    );
  }
}
