"use client";

import { UserSession } from "@models/User";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import { Button } from "@components/ui/button";
import Link from "next/link";
import { getSession, logout } from "@/src/lib/auth";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useRouter, usePathname } from "next/navigation";
import { Skeleton } from "@components/ui/skeleton";

export default function UserTab() {
  const [user, setUser] = useState<UserSession | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    async function getUser() {
      setLoading(true);
      const { session } = (await getSession()) as {
        session: { user: UserSession };
      };

      if (
        session &&
        (session.user.role === "Customer" || session.user.role === "Dev")
      ) {
        setUser(session.user);
      }
      setLoading(false);
    }

    getUser();
  }, []);

  if (loading) {
    return <Skeleton className="w-[71px] h-[36px] rounded-md" />;
  }

  if (user && (user.role === "Customer" || user.role === "Dev")) {
    return (
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">{user.first_name}</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="relative right-2">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {!pathname.startsWith("/account") ? (
            <Link href={`/account/${user.id}`}>
              <DropdownMenuItem>Profile</DropdownMenuItem>
            </Link>
          ) : (
            <DropdownMenuItem onClick={() => router.back()}>
              Back
            </DropdownMenuItem>
          )}
          <DropdownMenuItem
            onClick={async () => {
              const { proceed, message } = (await logout()) as {
                proceed: boolean;
                message: string;
              };

              if (!proceed) {
                return toast.error(message);
              }

              router.push("/sign-in");
            }}
          >
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button>Guest</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="relative right-2">
        <Link href="/sign-in" className="cursor-pointer w-full h-full">
          <DropdownMenuItem>Sign In</DropdownMenuItem>
        </Link>
        <Link href="/sign-up" className="cursor-pointer">
          <DropdownMenuItem>Sign Up</DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
