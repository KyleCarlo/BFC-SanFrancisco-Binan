import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = cookies().get("bfc-sfb-session");
    return NextResponse.json(
      { session, message: "Successfully Fetched Session" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to Get Session." },
      { status: 500 }
    );
  }
}
