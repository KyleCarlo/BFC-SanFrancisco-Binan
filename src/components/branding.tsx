import Image from "next/image";

export default function Branding() {
  return (
    <>
      <Image src="/bfc-logo.png" alt="bfc-logo" width={120} height={120} />
      <h1 className="text-bold text-3xl mt-4">
        <span className="text-gold">B</span>ut{" "}
        <span className="text-gold">F</span>irst{" "}
        <span className="text-gold">C</span>offee
      </h1>
      <p className="mb-4">San Francisco, Biñan City</p>
    </>
  );
}
