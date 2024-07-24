import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  try {
    cookies().set("bfc-sfb-session", "", { expires: new Date(0) });
    return NextResponse.json({
      message: "Sign Out Successful.",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to Sign Out." },
      { status: 500 }
    );
  }
}
