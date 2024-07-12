"use client";
import Link from "next/link";
import Image from "next/image";
import { Coffee } from "lucide-react";
import { Box } from "lucide-react";
import { Contact } from "lucide-react";
import { usePathname } from "next/navigation";

export default function NavBar() {
  const path = usePathname();
  return (
    <nav className="h-[100dvh] border-2 border-r-gray-500 p-2">
      <div className="py-4">
        <div className="w-[90%] relative pt-[100%]">
          <Image
            fill={true}
            src="/bfc-logo.png"
            alt="BFC Logo"
            className="w-full h-full top-0 left-0 object-cover"
          />
        </div>
      </div>
      <ul className="flex flex-col items-center justify-around h-[90%] px-2">
        <li>
          <Link href="/staff/orders">
            <Coffee className={path === "/staff/orders" ? "text-gold" : ""} />
          </Link>
        </li>
        <li>
          <Link href="/staff/inventory">
            <Box className={path === "/staff/inventory" ? "text-gold" : ""} />
          </Link>
        </li>
        <li>
          <Link href="/staff">
            <Contact className={path === "/staff" ? "text-gold" : ""} />
          </Link>
        </li>
      </ul>
    </nav>
  );
}
