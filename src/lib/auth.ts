import { SignJWT, jwtVerify } from "jose";

const key = new TextEncoder().encode(process.env.JWT_SECRET as string);

export async function encrypt(payload: any, days: number) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${days} days`)
    .sign(key);
}

export async function decrypt(input: string) {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });

  return payload;
}

export async function login(
  userType: "customer" | "staff",
  {
    email,
    password,
  }: {
    email: string;
    password: string;
  }
) {
  try {
    const response = await fetch(`/api/auth/${userType}`, {
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

export async function getSession() {
  try {
    const response = await fetch("/api/auth/", {
      method: "POST",
    });

    const { session, message } = await response.json();

    if (!response.ok) {
      return { proceed: false, message };
    }

    return { proceed: true, session, message: "Session Found." };
  } catch {
    return { proceed: false, message: "Unknown Error Occured." };
  }
}

export async function logout() {
  try {
    const response = await fetch("/api/auth/logout", {
      method: "POST",
    });

    const { message } = await response.json();

    if (!response.ok) {
      return { proceed: false, message };
    }

    return { proceed: true, message: "Logout Successful." };
  } catch {
    return { proceed: false, message: "Unknown Error Occured." };
  }
}
