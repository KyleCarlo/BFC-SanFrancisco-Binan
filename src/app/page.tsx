"use client";

import Image from "next/image";
import Branding from "@components/branding";
import { useState, useEffect } from "react";
import { ScrollArea } from "@components/ui/scroll-area";
import { Utensils } from "lucide-react";
import { CircleParking } from "lucide-react";
import { ShoppingBag } from "lucide-react";
import { Clock8 } from "lucide-react";
import { Button } from "@components/ui/button";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const [offerIndex, setOfferIndex] = useState(0);
  const offers = [
    "bottom-[-0.5px]",
    "bottom-[35.5px]",
    "bottom-[71px]",
    "bottom-[106.5px]",
  ];
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      setOfferIndex((prev) => (prev + 1) % 4);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="h-dvh overflow-hidden">
      <div className="h-dvh relative pt-[200%]">
        {/* <Image
          src="/store-portrait.jpg"
          alt="BFC-portrait"
          className="opacity-20 absolute top-0 z-[-10]"
          fill={true}
        /> */}
      </div>
      <div className="absolute top-0 w-full h-dvh overflow-hidden">
        <div className="z-30 absolute bottom-0 right-0 p-10">
          <Button
            onClick={() => {
              router.push("/sign-in");
            }}
          >
            Order Now
          </Button>
        </div>
        <ScrollArea className="h-dvh">
          <div className="flex flex-col justify-center items-center h-dvh">
            <Branding />
            <div className="flex gap-2 items-center overflow-hidden">
              <p>We offer: </p>
              <ul
                className={`relative ${offers[offerIndex]} h-[36px] leading-9 transition-all duration-500 text-bold text-gold`}
              >
                <li>Quality Coffee</li>
                <li>Savory Treats, Pasta & Pastries</li>
                <li>Work-friendly environment</li>
                <li>Caters small events</li>
              </ul>
            </div>
          </div>
          <div className="grid grid-cols-4">
            <div className="h-20 border-r-2 border-white flex flex-col justify-center items-center gap-2">
              <Utensils />
              <h1 className="text-xs">Dine In</h1>
            </div>
            <div className="h-20 border-r-2 border-white flex flex-col justify-center items-center gap-2">
              <div className="flex pb-[0.5]">
                <Utensils />
                <CircleParking />
              </div>
              <h1 className="text-xs">Park N{"'"} Go</h1>
            </div>
            <div className="h-20 border-r-2 border-white flex flex-col justify-center items-center gap-2">
              <ShoppingBag />
              <h1 className="text-xs">TakeOut</h1>
            </div>
            <div className="h-20 flex flex-col justify-center items-center gap-2">
              <Clock8 />
              <h1 className="text-xs">Pick Up Later</h1>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center my-5">
            <h1 className="text-lg text-gold text-bold tracking-wide">
              Rewards Mechanics
            </h1>
            <p className="text-xs">
              For every 20 pesos you spend, you earn 1 point and
            </p>
            <p className="flex-grow flex items-center">
              <span className="text-xl">1 point = 1 peso</span>
            </p>
          </div>

          <div className="h-[500px]"></div>
        </ScrollArea>
      </div>
    </main>
  );
}
