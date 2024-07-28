"use client";

import { Staff } from "@models/User";
import getStaffs from "@hooks/getStaffs";
import { useEffect, useState } from "react";
import DataTable from "@components/ui/data-table";
import staffColumns from "@components/staff/staffTable/columns";

export default function StaffHomePage() {
  const [loading, setLoading] = useState(true);
  const [staffs, setStaffs] = useState<Staff[]>([]);

  useEffect(() => {
    getStaffs(setStaffs, setLoading);
  }, []);

  return (
    <div className="p-4">
      {loading && <span>Loading...</span>}
      {!loading && <DataTable columns={staffColumns} data={staffs} />}
    </div>
  );
}
