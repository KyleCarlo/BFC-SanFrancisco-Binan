"use client";

import { Staff } from "@models/User";
import getStaffs from "@hooks/getStaffs";
import { useEffect, useState } from "react";
import DataTable from "@components/ui/data-table";
import staffColumns from "@components/staff/staffTable/columns";
import { Button } from "@components/ui/button";
import { getSession, logout } from "@lib/auth";
import { UserSession } from "@models/User";
import { useRouter } from "next/navigation";

export default function StaffHomePage() {
  const [loading, setLoading] = useState(true);
  const [loadingUser, setLoadingUser] = useState(true);
  const [staffs, setStaffs] = useState<Staff[]>([]);
  const [user, setUser] = useState<UserSession | null>(null);
  const router = useRouter();

  useEffect(() => {
    getStaffs(setStaffs, setLoading);
  }, []);

  useEffect(() => {
    async function getUser() {
      setLoadingUser(true);
      const { session } = (await getSession()) as {
        session: { user: UserSession };
      };

      if (session && session.user.role !== "Customer") {
        setUser(session.user);
      }
      setLoadingUser(false);
    }

    getUser();
  }, []);

  return (
    <main className="space-y-2 p-4">
      <nav className="flex justify-between">
        <p className="border-2 rounded-md flex items-center px-4">
          Logged in as: {user?.first_name}
        </p>
        <Button
          onClick={async () => {
            await logout();
            router.push("/staff/sign-in");
          }}
        >
          Logout
        </Button>
      </nav>
      <div>
        {loading && <span>Loading...</span>}
        {!loading && <DataTable columns={staffColumns} data={staffs} />}
      </div>
    </main>
  );
}
