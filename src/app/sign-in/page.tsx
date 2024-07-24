import Image from "next/image";
import GoogleButton from "@components/googleButton";
import SignInForm from "@components/signInForm";

export default async function LoginPage() {
  return (
    <main className="flex flex-col items-center justify-center h-dvh">
      <Image src="/bfc-logo.png" alt="bfc-logo" width={120} height={120} />
      <h1 className="text-bold text-3xl mt-4">
        <span className="text-gold">B</span>ut{" "}
        <span className="text-gold">F</span>irst{" "}
        <span className="text-gold">C</span>offee
      </h1>
      <p className="mb-4">San Francisco, Biñan City</p>
      <SignInForm role="staff" />
      <p className="my-2">or</p>
      <GoogleButton />
    </main>
  );
}
