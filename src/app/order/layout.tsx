import { CartProvider } from "@context/cart";
import { OrderFilterProvider } from "@context/orderFilter";
import RouteHandler from "@components/routeHandler";
import NavBar from "@components/customer/navigation";

export default function OrderLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <OrderFilterProvider>
        <NavBar />
        <RouteHandler>{children}</RouteHandler>
      </OrderFilterProvider>
    </main>
  );
}
