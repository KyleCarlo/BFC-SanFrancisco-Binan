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
