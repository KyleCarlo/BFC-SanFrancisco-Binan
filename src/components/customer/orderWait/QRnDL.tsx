"use client";

import QrCode from "react-qr-code";
import { Button } from "@components/ui/button";
import html2canvas from "html2canvas";

export default function QRDownload({
  value,
  filename,
}: {
  value: string;
  filename: string;
}) {
  return (
    <>
      <div id="qr-code" className="bg-white p-3 mb-3 rounded-xl">
        <QrCode value={value} size={260} className="bg-white rounded-lg" />
      </div>
      <Button
        className="w-[280px] mb-4"
        onClick={async () => {
          const element = document.getElementById("qr-code");
          if (element) {
            const canvas = await html2canvas(element);
            const data = canvas.toDataURL("image/jpg");
            const link = document.createElement("a");

            link.href = data;
            link.download = `${filename}.jpg`;

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }
        }}
      >
        Download QR Code
      </Button>
    </>
  );
}
