"use client";
import Link from "next/link";
import Image from "next/image";
import { Coffee } from "lucide-react";
import { Box } from "lucide-react";
import { Contact } from "lucide-react";
import { Store } from "lucide-react";
import { usePathname } from "next/navigation";

export default function NavBar() {
  const path = usePathname();
  return (
    <nav className="h-[100dvh] grid grid-rows-[60px_1fr] border-r-2 border-r-gray-500 justify-items-center pb-[60px] sticky top-0">
      <div className="relative w-full flex items-center justify-center p-2">
        <div className="w-[91%] relative pt-[100%]">
          <Image
            fill={true}
            src="/bfc-logo.png"
            alt="BFC Logo"
            className="w-full h-full top-0 left-0 object-cover"
          />
        </div>
      </div>
      <ul className="flex flex-col items-center justify-around">
        <li className="h-1/6 flex justify-center">
          <Link href="/staff/orders">
            <Coffee
              className={`h-full ${
                path === "/staff/orders" ? "text-gold" : ""
              }`}
            />
          </Link>
        </li>
        <li className="h-1/6 flex justify-center">
          <Link href="/staff/inventory">
            <Box
              className={`h-full ${
                path === "/staff/inventory" ? "text-gold" : ""
              }`}
            />
          </Link>
        </li>
        <li className="h-1/6 flex justify-center">
          <Link href="/staff">
            <Contact
              className={`h-full ${path === "/staff" ? "text-gold" : ""}`}
            />
          </Link>
        </li>
        <li className="h-1/6 flex justify-center">
          <Link href="/staff/store">
            <Store
              className={`h-full ${path === "/staff/store" ? "text-gold" : ""}`}
            />
          </Link>
        </li>
      </ul>
    </nav>
  );
}
