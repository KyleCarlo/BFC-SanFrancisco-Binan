import Image from "next/image";
import BFCLogo from "@public/bfc-logo.png";
import BFCName from "@public/bfc-name.png";

export default function Loading() {
  return (
    <div className="w-full h-dvh flex flex-col justify-center items-center gap-4">
      <Image
        src={BFCLogo}
        alt="bfc-logo"
        className="h-auto w-full max-w-[100px] animate-bounce"
        width={100}
        height={100}
      />
      <Image
        src={BFCName}
        alt="bfc"
        className="h-auto w-full max-w-[400px]"
        width={500}
        height={113.28125}
      />
    </div>
  );
}
