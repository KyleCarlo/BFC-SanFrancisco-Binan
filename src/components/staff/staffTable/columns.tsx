import { ColumnDef } from "@tanstack/react-table";
import { Staff } from "@/src/models/User";

const staffColumns: ColumnDef<Staff>[] = [
  {
    accessorKey: "first_name",
    header: "First Name",
  },
  {
    accessorKey: "last_name",
    header: "Last Name",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
];

export default staffColumns;
