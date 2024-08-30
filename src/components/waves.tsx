import Image from "next/image";
import WavesImage1 from "@public/waves-1.svg";
import WavesImage2 from "@public/waves-2.svg";

export default function Waves({
  className,
  imageIndex,
}: {
  className?: string;
  imageIndex: 0 | 1;
}) {
  const image = [WavesImage1, WavesImage2];
  return (
    <Image
      src={image[imageIndex]}
      alt="Waves"
      height={540}
      width={960}
      className={`${className}`}
    />
  );
}
