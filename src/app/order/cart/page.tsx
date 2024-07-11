import verifyCart from "@hooks/verifyCart";

export default async function CartPage() {
  const test = await verifyCart();

  return (
    <div>
      <h1>Cart</h1>
    </div>
  );
}
