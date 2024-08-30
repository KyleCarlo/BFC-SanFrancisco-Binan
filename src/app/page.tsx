import Image from "next/image";
import BFCLogo from "@public/bfc-logo.png";
import BFCName from "@public/bfc-name.png";
import HeaderImage from "@public/header-image.png";
import LoyalCupImage from "@public/loyal-cup.png";
import Link from "next/link";
import { Utensils } from "lucide-react";
import { CircleParking } from "lucide-react";
import { ShoppingBag } from "lucide-react";
import { Clock8 } from "lucide-react";
import { Button } from "@components/ui/button";
import { ArrowUpRight } from "lucide-react";
import Waves from "@components/waves";
import DisableZoom from "@components/disablezoom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@components/ui/carousel";
import { bestSellers } from "@lib/utils";

export default function HomePage() {
  return (
    <DisableZoom>
      <main className="p-5">
        <nav className="z-20 w-full flex justify-between absolute left-0 top-0 p-5 bg-gradient-to-t from-transparent via-black to-black">
          <div className="flex items-center">
            <Image
              width={50}
              height={50}
              src={BFCLogo}
              alt="BFC Logo"
              className="max-[1000px]:w-[30px]"
            />
            <Image
              width={441.41665318}
              height={100}
              src={BFCName}
              alt="BFC"
              className="h-[70px] w-auto max-[1000px]:h-[60px] max-[560px]:h-[30px]"
            />
          </div>
          <Link href="/sign-in">
            <Button className="h-full flex gap-3" variant="outline">
              <span className="text-bold tracking-wider flex flex-col leading-tight">
                <p className="max-[560px]:text-xs">Order</p>
                <p className="max-[560px]:text-xs">Now</p>
              </span>
              <Image
                src={BFCLogo}
                alt="bfc-logo"
                className="h-[40px] w-auto max-[400px]:hidden"
                width={50}
                height={50}
              />
            </Button>
          </Link>
        </nav>
        <div className="flex items-center relative h-dvh max-[1256px]:h-[80dvh] max-[560px]:h-[70dvh] max-[560px]:flex-col max-[560px]:justify-center">
          <Waves
            imageIndex={0}
            className="absolute w-full scale-x-110 bottom-0 max-[560px]:scale-x-125"
          />
          <Image
            width={800}
            height={800}
            src={HeaderImage}
            alt="Header Image"
            className="z-10 max-[1256px]:w-3/5 max-[560px]:w-full max-[560px]:max-w-[400px]"
          />
          <div className="flex flex-col w-full gap-7 max-[800px]:gap-3 items-center">
            <h1 className="text-center text-bold text-[4.5rem] relative max-[1538px]:right-36 max-[1256px]:right-1/4 max-[560px]:[right-0] max-[560px]:right-0 leading-snug text-[--gold] text-nowrap max-[1465px]:text-[4rem] max-[1394px]:text-[3rem] max-[990px]:text-[2.5rem] max-[900px]:text-[2rem] max-[720px]:text-[1.5rem]">
              High Quality,
              <br />
              Affordable Coffee
            </h1>
            <p className="text-center text-2xl relative max-[1538px]:right-36 min-[1256px]:max-w-[800px] max-[1256px]:right-1/4 max-[560px]:right-0 text-italic max-[1394px]:text-xl max-[990px]:text-lg max-[900px]:text-sm max-[560px]:max-w-[400px]">
              We aim to create a community hub where everyone can enjoy
              exceptional coffee and a relaxing environment.
            </p>
            <Link
              href="/sign-in"
              className="w-full flex justify-center relative max-[1538px]:right-36 max-[1256px]:right-1/4 max-[560px]:right-0 max-[800px]:mt-2"
            >
              <Button className="bg-[--gold] text-nowrap h-50 max-[990px]:h-12 rounded-full flex gap-4 max-w-min p-4 items-center px-7">
                <span className="text-nowrap text-2xl max-[990px]:text-lg">
                  Order Now
                </span>
                <ArrowUpRight className="rounded-full bg-white scale-125" />
              </Button>
            </Link>
          </div>
        </div>
        <div className="bg-[--gold] -mx-5 px-5 grid grid-cols-4 max-[360px]:grid-cols-2 relative top-[-2px] justify-items-center">
          <div className="flex flex-col items-center gap-2 max-[560px]:scale-75">
            <div className="border-2 border-black rounded-full p-4 bg-black">
              <Utensils className="size-8" />
            </div>
            <h1 className="text-black text-bold text-nowrap">DINE IN</h1>
          </div>
          <div className="flex flex-col items-center gap-2 max-[560px]:scale-75">
            <div className="border-2 border-black rounded-full p-4 bg-black">
              <ShoppingBag className="size-8" />
            </div>
            <h1 className="text-black text-bold text-nowrap">PICK UP</h1>
          </div>
          <div className="flex flex-col items-center gap-2 max-[560px]:scale-75">
            <div className="border-2 border-black rounded-full p-4 bg-black">
              <Clock8 className="size-8" />
            </div>
            <h1 className="text-black text-bold text-nowrap">SCHEDULE</h1>
          </div>
          <div className="flex flex-col items-center gap-2 max-[560px]:scale-75">
            <div className="border-2 border-black rounded-full p-4 bg-black">
              <CircleParking className="size-8" />
            </div>
            <h1 className="text-black text-bold text-nowrap">PARK N{"'"} GO</h1>
          </div>
        </div>
        <div className="-mx-5 px-5 relative top-[-3px] pb-10 min-[600px]:py-10 text-black flex items-center justify-evenly bg-gradient-to-b from-[--gold] via-[--gold] to-transparent">
          <div className="flex flex-col items-end gap-2">
            <h1 className="text-[4rem] max-md:text-[3rem] max-[600px]:text-[2rem] max-[400px]:text-[1.5rem]">
              Rewards
            </h1>
            <p className="text-2xl text-end max-md:text-lg max-[600px]:text-sm max-[400px]:text-xs">
              For every 20 pesos you spend on our Beverage, you gain 1 point.
            </p>
            <p className="text-2xl text-end max-md:text-lg max-[600px]:text-sm max-[400px]:text-xs">
              Once you get 100 points you can get a voucher and{" "}
              <span className="underline min-[600px]:text-nowrap">
                avail 1 free Beverage to us.
              </span>
            </p>
          </div>
          <Image
            height={731}
            width={599}
            alt="Loyal Cup"
            src={LoyalCupImage}
            className="h-[400px] w-auto max-[600px]:h-[250px] max-[400px]:h-[180px]"
          />
        </div>
        <div>
          <h1 className="text-[4rem] max-md:text-[3rem] max-[600px]:text-[2rem] max-[400px]:text-[1.5rem]">
            Our Best Sellers
          </h1>
          <Carousel className="w-full">
            <CarouselContent className="-ml-1">
              {bestSellers.map((item) => (
                <CarouselItem
                  key={item.id}
                  className="md:basis-1/2 lg:basis-1/3 flex justify-center"
                >
                  <div className="w-[300px] m-2 rounded-md">
                    <div className="w-full relative pt-[100%]">
                      <Image
                        fill={true}
                        src={`/best_sellers/${item.image}`}
                        alt={`Image of ${item.name}`}
                        className="w-full h-full top-0 left-0 object-cover rounded-md"
                      />
                    </div>
                    <h1 className="text-gold text-bold text-italic px-2 pt-1 pb-2 text-center text-2xl max-md:text-lg max-[600px]:text-sm max-[400px]:text-xs">
                      {item.name}
                    </h1>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </main>
    </DisableZoom>
  );
}
