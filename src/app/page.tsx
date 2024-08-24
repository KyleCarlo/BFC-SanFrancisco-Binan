"use client";

import Image from "next/image";
import BFCLogo from "@public/bfc-logo.png";
import BFCName from "@public/bfc-name.png";
import HeaderImage from "@public/header_image.png";
// import Branding from "@components/branding";
// import { useState, useEffect } from "react";
import { ScrollArea } from "@components/ui/scroll-area";
// import { Utensils } from "lucide-react";
// import { CircleParking } from "lucide-react";
// import { ShoppingBag } from "lucide-react";
// import { Clock8 } from "lucide-react";
// import { Button } from "@components/ui/button";
// import { useRouter } from "next/navigation";

export default function HomePage() {
  return (
    <main className="overflow-hidden">
      <ScrollArea className="h-dvh">
        <div className="flex justify-between">
          <div className="flex flex-col flex-grow justify-center items-center gap-4 min-w-[100px]">
            <Image
              src={BFCLogo}
              alt="bfc-logo"
              className="h-auto w-full max-w-[100px]"
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
          <div className="">
            <Image
              src={HeaderImage}
              alt="Header Image"
              className="h-auto max-w-[500px] w-full"
              width={500}
              height={113.28125}
            />
          </div>
        </div>
      </ScrollArea>
    </main>
  );
}
