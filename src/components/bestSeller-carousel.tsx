"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { bestSellers } from "@lib/utils";
import Image from "next/image";
import { useRef } from "react";

export default function BestSellers() {
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

  return (
    <Carousel
      className="mx-2 w-[200px] min-[350px]:w-[calc(100dvw-90px)]"
      opts={{
        align: "start",
        loop: true,
      }}
      plugins={[plugin.current as any]}
    >
      <CarouselContent>
        {bestSellers.map((item) => (
          <CarouselItem
            key={item.id}
            className="min-[350px]:basis-1/2 md:basis-1/3 lg:basis-1/4 flex justify-center"
          >
            <div className="w-full max-w-72">
              <div className="w-full relative pt-[100%]">
                <Image
                  fill={true}
                  src={`/best_sellers/${item.image}`}
                  alt={`Image of ${item.name}`}
                  className="w-full h-full top-0 left-0 object-cover rounded-md"
                />
              </div>
              <h1 className="text-gold text-bold text-italic px-2 pt-1 pb-2 text-center text-2xl text-italic max-[1170px]:text-xl max-[900px]:text-sm">
                {item.name}
              </h1>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="top-[calc(50%-15px)] left-[-20px]" />
      <CarouselNext className="top-[calc(50%-15px)] right-[-20px]" />
    </Carousel>
  );
}
