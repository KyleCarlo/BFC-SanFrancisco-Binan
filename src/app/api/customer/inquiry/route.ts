import { NextRequest, NextResponse } from "next/server";
import { transporter, Inquiry } from "@lib/email";
import { EmailForm } from "@/src/models/EmailForm";

export async function POST(req: NextRequest) {
  const body = (await req.json()) as EmailForm;

  if (
    !body ||
    !body.email ||
    !body.name ||
    !body.phone_number ||
    !body.message
  ) {
    return NextResponse.json(
      {
        message: "Invalid Email. Please Complete All Necessary Details.",
      },
      { status: 400 }
    );
  }

  try {
    await transporter.sendMail({
      from: '"But First Coffee - San Francisco Biñan" <no-reply@bfc-sfb.com>', // sender address
      to: "inquiry@bfc-sfb.com", // list of receivers
      subject: `Inquiry from ${body.name}`, // Subject line
      html: Inquiry(body),
    });

    return NextResponse.json(
      { message: "Inquiry Succ  essfully Sent." },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Failed to Send Inquiry.",
      },
      { status: 500 }
    );
  }
}
