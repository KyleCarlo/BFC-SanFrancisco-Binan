import Image from "next/image";

export default function Branding() {
  return (
    <>
      <Image src="/bfc-logo.png" alt="bfc-logo" width={120} height={120} />
      <Image
        src="/bfc-name.png"
        alt="bfc-name"
        width={280}
        height={110}
        className="mt-2 mb-4"
      />
    </>
  );
}
