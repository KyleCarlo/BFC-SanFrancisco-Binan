import { NextRequest, NextResponse } from "next/server";
import db from "@lib/db";

export async function GET() {
  try {
    const MOP = await db.selectFrom("MOP").selectAll().execute();
    return NextResponse.json({ MOP }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error Mode of Payments." },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const { acct_name, bank_name, qr_code } = await req.json();

  if (!bank_name || !qr_code || !acct_name) {
    return NextResponse.json(
      { message: "Please Provide Bank Name and QR Code." },
      { status: 400 }
    );
  }

  try {
    await db
      .insertInto("MOP")
      .values({ acct_name, bank_name, qr_code })
      .execute();

    return NextResponse.json(
      { message: "Mode of Payment Added." },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to Add Mode of Payment." },
      { status: 400 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  const { id, available } = await req.json();

  try {
    await db
      .updateTable("MOP")
      .set("available", available)
      .where("id", "=", id)
      .execute();
    return NextResponse.json(
      { message: `Mode of Payment Successfully Updated.` },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to Update Mode of Payment." },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  const body = await req.json();

  try {
    await db.updateTable("MOP").set(body).where("id", "=", body.id).execute();
    return NextResponse.json(
      { message: `Mode of Payment Successfully Updated.` },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to Update Mode of Payment." },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  const { ids } = await req.json();

  if (ids.length === 0) {
    return NextResponse.json(
      { message: "No Selected for Deletion." },
      { status: 400 }
    );
  }

  try {
    await db.deleteFrom("MOP").where("id", "in", ids).execute();
    return NextResponse.json(
      { message: `Mode of Payment Deleted.` },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to Delete Mode of Payment." },
      { status: 500 }
    );
  }
}
