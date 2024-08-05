import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: "smtp.zoho.com",
  name: "bfc-sfb.com",
  port: 465, // Replace with the correct port (25, 465, or 587)
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.OTP_SENDER as string,
    pass: process.env.OTP_SENDER_AUTH as string,
  },
  logger: process.env.NODE_ENV === "production" ? false : true,
  debug: process.env.NODE_ENV === "production" ? false : true,
});

export function OTPmessage(first_name: string, otp: string) {
  return `
  <body
    style="
      font-family: Arial, sans-serif;
      background-color: gray;
      color: #fac666;
      margin: 0;
      padding: 10px;
    "
  >
    <div
      style="
        background-color: #000000;
        margin: 40px auto;
        padding: 20px;
        max-width: 600px;
        border: 1px solid #fac666;
        border-radius: 5px;
      "
    >
      <div style="padding: 20px">
        <h1 style="font-size: 24px; margin-bottom: 20px; color: white">
          Welcome to BFC-SFB App!
        </h1>
        <p style="font-size: 16px; line-height: 1.5; color: white">
          Dear ${first_name},
        </p>
        <p style="font-size: 16px; line-height: 1.5; color: white">
          Thank you for registering with us. We are excited to have you on board!
        </p>
        <p style="font-size: 16px; line-height: 1.5; color: white">
          Your OTP (One-Time Password) for verification is:
        </p>
        <div
          style="
            font-size: 20px;
            font-weight: bold;
            color: #000000;
            text-align: center;
            padding: 15px;
            background-color: #fac666;
            border-radius: 5px;
            margin: 20px 0;
          "
        >
          ${otp}
        </div>
        <!-- Replace with the actual OTP -->
        <p style="font-size: 16px; line-height: 1.5; color: white">
          Please enter this OTP on our website to complete your registration.
        </p>
        <p style="font-size: 16px; line-height: 1.5; color: white">
          If you did not request this OTP, please ignore this email.
        </p>
        <p style="font-size: 16px; line-height: 1.5; color: white">
          Thank you,<br />BFC-SFB Team
        </p>
      </div>
      <div
        style="
          text-align: center;
          padding-top: 20px;
          font-size: 14px;
          color: #fac666;
        "
      >
        <p>&copy; 2024 BFC-SFB. All rights reserved.</p>
        <p>RJ Titus bldg, Lot 2098-A Halang Rd, Brgy, Biñan, 4024 Laguna</p>
      </div>
    </div>
  </body>
  `;
}
