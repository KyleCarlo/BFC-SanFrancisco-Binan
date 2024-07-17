"use client";

import getMOPs from "@hooks/getMOPs";
import MOPTable from "@components/ui/data-table";
import MOPColumns from "@components/staff/mop/table/columns";
import AddMOPDialog from "@components/staff/mop/addMOP-dialog";
import { useEffect, useState } from "react";
import { MOP } from "@models/MOP";

export default function StorePage() {
  const [mops, setMops] = useState<MOP[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMOPs(setMops, setLoading);
  }, []);

  return (
    <main className="flex flex-col justify-center items-center">
      <div className="flex items-center gap-4 p-4">
        <AddMOPDialog />
      </div>
      <div className="w-full px-4">
        {loading && <div>Loading...</div>}
        {!loading && <MOPTable data={mops} columns={MOPColumns} />}
      </div>
    </main>
  );
}
