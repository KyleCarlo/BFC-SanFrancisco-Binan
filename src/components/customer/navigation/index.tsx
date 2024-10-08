"use client";

import Image from "next/image";
import BFCLogo from "@public/bfc-logo.png";
import BFCName from "@public/bfc-name.png";
import UserTab from "./userTab";
import SearchBar from "./searchBar";
import { usePathname } from "next/navigation";

export default function NavBar() {
  const pathname = usePathname();

  return (
    <div className="flex w-full p-2 justify-between sticky top-0 z-10 gap-2 bg-gradient-to-t from-transparent via-black to-black">
      <div className="flex items-center">
        <Image width={30} height={30} src={BFCLogo} alt="BFC Logo" />
        <Image
          width={132.424995954}
          height={30}
          src={BFCName}
          alt="BFC"
          className="max-[650px]:hidden"
        />
      </div>
      {pathname === "/order" && <SearchBar />}
      <UserTab />
    </div>
  );
}
