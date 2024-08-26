"use client";

import getMOPs from "@hooks/getMOPs";
import DataTable from "@components/ui/data-table";
import MOPColumns from "@components/staff/mop/table/columns";
import AddMOPDialog from "@components/staff/mop/addMOP-dialog";
import AvailDialog from "@components/staff/reward-dialog";
import PointsDialog from "@components/staff/points-dialog";
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
      <div className="flex flex-wrap items-center justify-center gap-4 p-4">
        <AddMOPDialog />
        <AvailDialog />
        <PointsDialog />
      </div>
      <div className="w-full px-4">
        {loading && <div>Loading...</div>}
        {!loading && <DataTable data={mops} columns={MOPColumns} />}
      </div>
    </main>
  );
}
