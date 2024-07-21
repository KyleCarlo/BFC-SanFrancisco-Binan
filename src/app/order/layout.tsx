import { CartProvider } from "@context/cart";
import RouteHandler from "@components/routeHandler";

export default function OrderLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <RouteHandler>
          <CartProvider>{children}</CartProvider>
        </RouteHandler>
      </body>
    </html>
  );
}
