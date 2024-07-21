import DOMPurify from "isomorphic-dompurify";

export default function QRCode({ qr_svg }: { qr_svg: string }) {
  const __html = DOMPurify.sanitize(qr_svg);
  return (
    <div
      className="w-full h-full top-0 left-0 object-cover rounded-md"
      dangerouslySetInnerHTML={{ __html }}
    />
  );
}

{
  /* <div className="w-full relative pt-[100%]">
  <Image
    fill={true}
    src={item.image}
    alt={`Image of ${item.name}`}
    className="w-full h-full top-0 left-0 object-cover rounded-md"
  />
</div> */
}
