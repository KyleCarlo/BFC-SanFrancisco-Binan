import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { decrypt } from "@lib/auth";

export async function GET() {
  try {
    const session = cookies().get("bfc-sfb-session");

    if (!session) {
      return NextResponse.json(
        { message: "No Session Found." },
        { status: 200 }
      );
    }

    const decrypted_value = await decrypt(session.value);

    return NextResponse.json(
      { session: decrypted_value, message: "Successfully Fetched Session" },
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
