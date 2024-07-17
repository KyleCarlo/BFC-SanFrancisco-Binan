import { NextResponse } from "next/server";
import db from "@lib/db";

export async function GET() {
  try {
    const staff = await db.selectFrom("Staff").selectAll().execute();

    return NextResponse.json({ staff }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error Fetching Staff." },
      { status: 500 }
    );
  }
}
