export default async function getMOPs() {
  try {
    const response = await fetch(`http://localhost:3000/api/mop`, {
      method: "GET",
      cache: "no-store",
    });

    const { MOP } = await response.json();
    return MOP;
  } catch (error) {
    console.log(error);
    return { message: "Error Fetching Mode of Payments." };
  }
}
