import { NextRequest, NextResponse } from "next/server";
import db from "@lib/db";

export async function GET(req: NextRequest) {
  const bank_name = req.nextUrl.searchParams.get("name") as string;

  try {
    const existing = await db
      .selectFrom("MOP")
      .select("bank_name")
      .where("bank_name", "=", bank_name)
      .execute();

    if (existing.length > 0) {
      return NextResponse.json(
        { message: `${bank_name} Already Exists. Please Rename.` },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "Bank Name Available." },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to Check Bank Name." },
      { status: 400 }
    );
  }
}
