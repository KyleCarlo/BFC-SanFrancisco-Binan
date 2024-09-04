import { OrderType } from "@models/Order";
import { Utensils, Clock8, CircleParking, ShoppingBag } from "lucide-react";
import GrabFood from "@public/grabfood.png";
import FoodPanda from "@public/foodpanda.png";
import Image from "next/image";
import Link from "next/link";

export default function Services({
  serviceType,
  direction = "left",
}: {
  serviceType: OrderType | "Delivery";
  direction?: "left" | "right";
}) {
  const IconsDisplay = {
    DineIn: <Utensils className="size-8" />,
    PickUpNow: <ShoppingBag className="size-8" />,
    PickUpLater: <Clock8 className="size-8" />,
    ParkNGo: <CircleParking className="size-8" />,
    Delivery: (
      <svg
        width="256px"
        height="256px"
        viewBox="0 0 24.00 24.00"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        stroke="#fff"
        strokeWidth="0.00024000000000000003"
        className="size-8 scale-125"
      >
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g id="SVGRepo_tracerCarrier"></g>
        <g id="SVGRepo_iconCarrier">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12.75 6H17.1259L17.2975 6.9435C18.4702 6.86169 19.5208 7.70372 19.6814 8.88536C19.8327 9.99885 19.1418 11.0326 18.0976 11.344L18.6383 14.318C19.9885 14.6106 21 15.8122 21 17.25C21 18.9069 19.6569 20.25 18 20.25C16.3431 20.25 15 18.9069 15 17.25H10.5C10.5 18.9069 9.15685 20.25 7.5 20.25C5.84315 20.25 4.5 18.9069 4.5 17.25L3 17.25V15C3 13.3431 4.34315 12 6 12H9H10.5V13.5H14.25V7.5H12.75V6ZM6 13.5H9L9 15.75L4.5 15.75V15C4.5 14.1716 5.17157 13.5 6 13.5ZM15.75 7.5L15.75 13.5C15.75 14.3284 15.0784 15 14.25 15L10.5 15V15.75L15.4013 15.75C15.7779 15.0991 16.3919 14.6028 17.1249 14.3796L15.8741 7.5H15.75ZM17.824 9.83964L17.571 8.4476C17.8887 8.49858 18.1495 8.7519 18.195 9.08731C18.2374 9.39925 18.0815 9.69241 17.824 9.83964ZM19.5 17.25C19.5 18.0784 18.8284 18.75 18 18.75C17.1716 18.75 16.5 18.0784 16.5 17.25C16.5 16.4216 17.1716 15.75 18 15.75C18.8284 15.75 19.5 16.4216 19.5 17.25ZM6 17.25C6 18.0784 6.67157 18.75 7.5 18.75C8.32843 18.75 9 18.0784 9 17.25H6ZM10.5 9.75H6V11.25H10.5V9.75Z"
            fill="#fff"
          ></path>
        </g>
      </svg>
    ),
  };
  const Title = {
    DineIn: "DINE IN",
    PickUpNow: (
      <span className="flex flex-col items-center leading-none">
        <span>PICK UP</span>
        <span className="text-xs">NOW / LATER</span>
      </span>
    ),
    PickUpLater: (
      <span className="flex flex-col items-center leading-none">
        <span>PICK UP</span>
        <span className="text-xs">NOW / LATER</span>
      </span>
    ),
    ParkNGo: `PARK N${"'"} GO`,
    Delivery: "DELIVERY",
  };
  const Description = {
    DineIn: (
      <span>
        Enjoy our menu in a cozy setting with 30-50 seats, perfect for small
        events. For reservations during peak hours,{" "}
        <Link href="#contact" className="underline">
          contact us
        </Link>
        .
      </span>
    ),
    PickUpNow:
      "Pre-order online and pick up at our shop. Show your order confirmation at the pick-up window for a quick experience.",
    PickUpLater:
      "Pre-order online and pick up at our shop. Show your order confirmation at the pick-up window for a quick experience.",
    ParkNGo:
      "Park in front, and we'll bring your order to your car. Just order online and share your parking spot.",
    Delivery: (
      <span className="w-full">
        <span className="flex flex-col items-center">
          <span className="flex gap-2">
            <Image
              src={FoodPanda}
              alt="FoodPanda"
              width={100}
              height={100}
              className="h-[50px] w-auto"
            />
            <Image
              src={GrabFood}
              alt="GrabFood"
              width={100}
              height={100}
              className="h-[45px] w-auto"
            />
          </span>
          <span>Order on Foodpanda now! Grabfood is coming soon.</span>
        </span>
      </span>
    ),
  };

  return (
    <div
      className={`flex gap-0 min-[500px]:gap-5 min-[901px]:gap-10 min-[1200px]:gap-20 min-[1400px]:gap-25 items-center ${
        direction === "right" ? "flex-row-reverse" : ""
      }`}
    >
      <div className="flex flex-col items-center gap-2 max-[560px]:scale-75 max-w-min">
        <div className="border-2 border-black rounded-full p-4 bg-black">
          {IconsDisplay[serviceType]}
        </div>
        <h1 className="text-black text-bold text-nowrap">
          {Title[serviceType]}
        </h1>
      </div>
      <p className="text-black text-justify max-w-[500px] text-[1.25rem] max-[1394px]:text-xl max-[990px]:text-lg max-[900px]:text-sm max-[350px]:text-xs">
        {Description[serviceType]}
      </p>
    </div>
  );
}
