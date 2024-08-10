import { NextRequest, NextResponse } from "next/server";
import { Cart, ItemDetailsList } from "@models/Cart";
import db from "@lib/db";

export async function POST(req: NextRequest) {
  const body: Cart = await req.json();

  if (!body) {
    return NextResponse.json({ message: "Invalid Cart." }, { status: 400 });
  }

  let food_ids: number[] = [];
  let food_variation_ids: number[] = [];
  let beverage_ids: number[] = [];
  let beverage_variation_ids: number[] = [];
  body.forEach((item) => {
    if (item.itemType === "food") {
      food_ids.push(item.id);
      food_variation_ids.push(item.variation_id);
    } else if (item.itemType === "beverage") {
      beverage_ids.push(item.id);
      beverage_variation_ids.push(item.variation_id);
    }
  });

  try {
    let food_details: { id: number; name: string; image: string }[] = [];
    let food_variation_details: {
      id: number;
      price: number;
      serving: string;
    }[] = [];
    let beverage_details: { id: number; name: string; image: string }[] = [];
    let beverage_variation_details: {
      id: number;
      price: number;
      serving: string;
      hot_cold: "Cold" | "Hot" | null;
      concentrate: number;
    }[] = [];
    if (food_ids.length > 0 && food_variation_ids.length > 0) {
      food_details = await db
        .selectFrom("Food")
        .select(["id", "name", "image"])
        .where("id", "in", food_ids)
        .execute();
      food_variation_details = await db
        .selectFrom("FoodVariation")
        .select(["id", "price", "serving"])
        .where("id", "in", food_variation_ids)
        .execute();
    }
    if (beverage_ids.length > 0 && beverage_variation_ids.length > 0) {
      beverage_details = await db
        .selectFrom("Beverage")
        .select(["id", "name", "image"])
        .where("id", "in", beverage_ids)
        .execute();
      beverage_variation_details = await db
        .selectFrom("BeverageVariation")
        .select(["id", "price", "serving", "hot_cold", "concentrate"])
        .where("id", "in", beverage_variation_ids)
        .execute();
    }

    const itemDetails: ItemDetailsList = body.map((item) => {
      if (item.itemType === "food") {
        const food = food_details.find((food) => food.id === item.id);
        const food_variation = food_variation_details.find(
          (food) => food.id === item.variation_id
        );
        if (food && food_variation) {
          return {
            ...item,
            name: food.name,
            image: food.image,
            price: food_variation.price / 100,
            serving: food_variation.serving,
          };
        }
      } else {
        const beverage = beverage_details.find((bev) => bev.id === item.id);
        const beverage_variation = beverage_variation_details.find(
          (bev) => bev.id === item.variation_id
        );
        if (beverage && beverage_variation) {
          return {
            ...item,
            name: beverage.name,
            image: beverage.image,
            price: beverage_variation.price / 100,
            serving: beverage_variation.serving,
            hot_cold: beverage_variation.hot_cold as string,
            concentrate: beverage_variation.concentrate == 1 ? true : false,
          };
        }
      }

      return {
        ...item,
        name: "Item Not Found",
        image: "Item Not Found",
        price: 0,
        serving: "Item Not Found",
      };
    });

    return NextResponse.json({ itemDetails }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to Fetch Cart Details." },
      { status: 500 }
    );
  }
}
