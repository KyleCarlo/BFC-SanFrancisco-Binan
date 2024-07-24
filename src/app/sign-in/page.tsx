"use client";

import Image from "next/image";
import GoogleButton from "@components/googleButton";
import SignInForm from "@components/signInForm";
import { logout, getSession } from "@lib/auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import Branding from "@components/branding";

export default function LoginPage() {
  const router = useRouter();
  const [showLogin, setShowLogin] = useState(false);
  return (
    <>
      <main
        className={`transition-all duration-500 flex flex-col items-center justify-center h-dvh gap-10 ${
          !showLogin ? "opacity-100" : "opacity-0"
        }`}
      >
        <div
          onClick={async () => {
            const { proceed, message } = (await logout()) as {
              proceed: boolean;
              message: string;
            };

            if (!proceed) {
              return toast.error(message);
            }

            router.push("/order");
          }}
          className="flex items-center justify-between w-60 border-solid border-2 rounded-2xl p-5 hover:cursor-pointer"
        >
          <div>
            <h1>Continue as</h1>
            <h1 className="text-italic text-bold text-2xl">Guest</h1>
          </div>
          <Image src="/guest-logo.svg" alt="GUEST" width={50} height={50} />
        </div>
        <div
          className="flex items-center justify-between w-60 border-solid border-2 border-gold rounded-2xl p-5 hover:cursor-pointer"
          onClick={async () => {
            const { session, proceed, message } = await getSession();
            if (!proceed) {
              return toast.error(message);
            }
            if (!session) {
              setShowLogin(true);
            } else {
              router.push("/order");
            }
          }}
        >
          <div>
            <h1 className="text-gold">Continue with</h1>
            <h1 className="text-gold text-italic text-bold text-2xl">
              Loyalty
            </h1>
          </div>
          <Image src="/loyal-logo.svg" alt="LOYAL" width={50} height={50} />
        </div>
      </main>
      <main
        className={`transition-all duration-500 delay-500 flex flex-col items-center justify-center h-dvh absolute top-0 w-full ${
          !showLogin ? "opacity-0 -z-10" : "opacity-100 z-10"
        }`}
      >
        <Branding />
        <SignInForm role="customer" />
        <Link href="/sign-up" className="text-gold underline text-right">
          Don{"'"}t have an account yet?
        </Link>
        <div className="my-2 flex gap-3">
          <p className="tracking-[-3px]">--------------------------------</p>
          <p>or</p>
          <p className="tracking-[-3px]">--------------------------------</p>
        </div>
        <GoogleButton />
      </main>
    </>
  );
}
