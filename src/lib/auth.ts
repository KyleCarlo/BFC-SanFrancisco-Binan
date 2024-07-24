import dayjs from "./dayjs";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const key = new TextEncoder().encode(process.env.JWT_SECRET as string);

export async function encrypt(payload: any) {
  console.log(key);
  console.log(process.env.JWT_SECRET);
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("30 sec from now")
    .sign(key);
}

export async function decrypt(input: string) {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });

  return payload;
}

export async function login({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    const response = await fetch("http://localhost:3000/api/auth/staff", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    const { message } = await response.json();

    if (!response.ok) {
      return { proceed: false, message };
    }

    return { proceed: true, message: "Login Successful." };
  } catch {
    return { proceed: false, message: "Unknown Error Occured." };
  }
}
