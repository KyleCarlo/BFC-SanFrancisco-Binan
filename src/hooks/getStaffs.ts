export default async function getStaffs() {
  try {
    const response = await fetch(`http://localhost:3000/api/staff`, {
      method: "GET",
    });

    const { staff } = await response.json();

    return staff;
  } catch (error) {
    console.log(error);
    return { message: "Error Fetching Staff." };
  }
}
