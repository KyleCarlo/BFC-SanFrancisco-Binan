import Image from "next/image";
import BFCLogo from "@public/bfc-logo.png";
import BFCName from "@public/bfc-name.png";
import HeaderImage from "@public/header-image.png";
import LoyalCupImage from "@public/loyal-cup.png";
import Link from "next/link";
import { Button } from "@components/ui/button";
import { ArrowUpRight } from "lucide-react";
import Waves from "@components/waves";
import DisableZoom from "@components/disablezoom";
import BestSellers from "@components/bestSeller-carousel";
import Services from "@components/services";

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
        <div className="flex items-center relative min-h-[550px] h-dvh max-[1256px]:h-[80dvh] max-[560px]:h-[70dvh] max-[560px]:flex-col max-[560px]:justify-center">
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
            <h1 className="text-center text-bold text-[4.5rem] relative max-[1538px]:right-36 max-[1256px]:right-1/4 max-[560px]:[right-0] max-[560px]:right-0 leading-snug text-nowrap max-[1465px]:text-[4rem] max-[1394px]:text-[3rem] max-[990px]:text-[2.5rem] max-[900px]:text-[2rem] max-[720px]:text-[1.5rem]">
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
        <div className="bg-[--gold] -mx-5 px-5 relative top-[-2px] grid grid-rows-4 place-items-center gap-0 min-[900px]:gap-5 min-[990px]:gap-10">
          <Services serviceType="DineIn" direction="right" />
          <Services serviceType="PickUpNow" />
          <Services serviceType="ParkNGo" direction="right" />
          <Services serviceType="Delivery" />
        </div>
        <div className="-mx-5 px-5 relative top-[-3px] pb-20 text-black flex items-center justify-evenly bg-gradient-to-b from-[--gold] via-[--gold] to-transparent">
          <div className="flex flex-col items-end gap-2">
            <h1 className="text-[4rem] max-md:text-[3rem] max-[600px]:text-[2rem] max-[400px]:text-[1.5rem]">
              Rewards
            </h1>
            <p className="text-2xl text-end max-md:text-lg max-[600px]:text-sm max-[400px]:text-xs">
              For every 20 pesos you spend on our Beverage, you gain 1 point.
            </p>
            <p className="text-2xl text-end max-md:text-lg max-[600px]:text-sm max-[400px]:text-xs">
              Once you get 100 points you can get a voucher and{" "}
              <span className="text-bold tracking-wide underline min-[600px]:text-nowrap">
                avail 1 free Beverage to us.
              </span>
            </p>
            <p className="text-end text-xs min-[440px]:text-sm min-[601px]:text-lg text-italic">
              *not applicable for Dine In*
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
        <div className="flex flex-col items-center">
          <h1 className="mb-2 text-center text-bold text-[4rem] leading-snug text-nowrap max-[1394px]:text-[3rem] max-[990px]:text-[2.5rem] max-[900px]:text-[2rem] max-[720px]:text-[1.5rem]">
            Our Best Sellers
          </h1>
          <BestSellers />
        </div>
        <div className="flex justify-center mt-10 max-[640px]:mt-5">
          <div className="bg-[--gold] rounded-2xl w-3/4 overflow-hidden min-w-[280px]">
            <h1 className="pt-2 text-black mb-2 text-center text-bold text-[4rem] leading-snug text-nowrap max-[1394px]:text-[3rem] max-[990px]:text-[2.5rem] max-[900px]:text-[2rem] max-[720px]:text-[1.5rem]">
              Visit Us
            </h1>
            <div className="w-full bg-black rounded-2xl overflow-hidden flex max-[700px]:flex-wrap max-[700px]:border-4 max-[700px]:border-[--gold]">
              <video
                autoPlay
                muted
                loop
                className="h-[calc(100dvh-300px)] max-[700px]:w-full"
              >
                <source src="/video_intro.mp4" />
                Cannot play Video
              </video>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3865.602695272403!2d121.05873279481389!3d14.33449567834182!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397d70076fdcc43%3A0xa7825b4aa4d60ccc!2sBut%20First%2C%20Coffee%20(BFC)%20-%20San%20Francisco%20Binan!5e0!3m2!1sen!2sph!4v1725445759365!5m2!1sen!2sph"
                width="400"
                height="520"
                loading="lazy"
                className="flex-grow h-[calc(100dvh-300px)] max-[441px]:w-full"
              >
                Cannot display Location
              </iframe>
            </div>
          </div>
        </div>
      </main>
    </DisableZoom>
  );
}
