import { NextRequest, NextResponse } from "next/server";
import prisma from "@lib/db";

export async function GET(req: NextRequest) {
  const itemType = req.nextUrl.searchParams.get("itemType");

  let items;
  switch (itemType) {
    case "food":
      items = await prisma.food.findMany({
        include: { variations: true },
      });
      break;
    case "beverage":
      items = await prisma.beverage.findMany({
        include: { variations: true },
      });
      break;
    default:
      return NextResponse.json({ error: "Invalid item type" }, { status: 400 });
  }

  return NextResponse.json({ items }, { status: 200 });
}
