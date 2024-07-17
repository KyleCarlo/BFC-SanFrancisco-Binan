import getStaffs from "@hooks/getStaffs";

export default async function StaffHomePage() {
  const staffs = await getStaffs();
  return (
    <main>
      <h1>Staffs</h1>
    </main>
  );
}
