import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center h-dvh gap-10">
      <a
        href="/order"
        className="flex items-center justify-between w-60 border-solid border-2 rounded-2xl p-5"
      >
        <div>
          <h1>Continue as</h1>
          <h1 className="text-italic text-bold text-2xl">Guest</h1>
        </div>
        <Image src="/guest-logo.svg" alt="GUEST" width={50} height={50} />
      </a>
      <a
        href="/login"
        className="flex items-center justify-between w-60 border-solid border-2 border-gold rounded-2xl p-5"
      >
        <div>
          <h1 className="text-gold">Continue with</h1>
          <h1 className="text-gold text-italic text-bold text-2xl">Loyalty</h1>
        </div>
        <Image src="/loyal-logo.svg" alt="LOYAL" width={50} height={50} />
      </a>
    </main>
  );
}
