import getMOPs from "@hooks/getMOPs";
import MOPTable from "@components/ui/data-table";
import MOPColumns from "@components/staff/mop/table/columns";
import AddMOPDialog from "@components/staff/mop/addMOP-dialog";

export default async function StorePage() {
  const MOPs = await getMOPs();
  return (
    <main className="flex flex-col justify-center items-center">
      <div className="flex items-center gap-4 p-4">
        <AddMOPDialog />
      </div>
      <div className="w-full px-4">
        <MOPTable data={MOPs} columns={MOPColumns} />
      </div>
    </main>
  );
}
