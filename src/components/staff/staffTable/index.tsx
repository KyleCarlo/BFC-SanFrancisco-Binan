"use client";

import DataTable from "@components/ui/data-table";
import staffColumns from "@components/staff/staffTable/columns";
import { Staff } from "@models/User";
import { toast } from "sonner";

export default function StaffList({
  staff,
  message,
}: {
  staff?: Staff[];
  message: string;
}) {
  if (!staff) {
    toast.error(message);
    return (
      <main className="p-4">
        <DataTable columns={staffColumns} data={[]} />
      </main>
    );
  }

  return (
    <main className="p-4">
      <DataTable columns={staffColumns} data={staff} />
    </main>
  );
}
