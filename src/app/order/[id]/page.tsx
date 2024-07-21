import { serverGetOrder } from "@hooks/getOrder";
import { renderSVG } from "uqr";
import QRCode from "@components/qrcode";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/tabs";
import { serverGetCartDetails } from "@hooks/getCartDetails";
import CartList from "@components/customer/cart-list";
import OrderStatus from "@components/customer/orderWait/status";
import { ScrollArea } from "@components/ui/scroll-area";

export default async function WaitingPage({
  params,
}: {
  params: { id: string };
}) {
  const { order, message: message_1 } = await serverGetOrder(params.id);

  if (!order) {
    return <h1>{message_1}</h1>;
  }

  const qr_svg = renderSVG(params.id);
  const { itemDetails, message: message_2 } = await serverGetCartDetails(
    order.items
  );

  if (!itemDetails) {
    return <h1>{message_2}</h1>;
  }

  return (
    <div className="h-[100dvh] grid grid-rows-[0.2fr_1fr] overflow-hidden p-4 items-stretch justify-center text-center">
      <OrderStatus status={order.status} />
      <Tabs
        defaultValue="qr-code"
        className="w-full max-w-[500px] overflow-hidden"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="qr-code">QR Code</TabsTrigger>
          <TabsTrigger value="order">Order Details</TabsTrigger>
        </TabsList>
        <TabsContent value="qr-code">
          <div className="py-2">
            <p>Order ID: {params.id}</p>
            <div className="px-5 mb-5">
              <QRCode qr_svg={qr_svg} />
            </div>
            <h1>Keep the QR for Tracking and Receiving the Order.</h1>
          </div>
        </TabsContent>
        <TabsContent value="order" className="h-2/3">
          <ScrollArea className="min-w-[300px] h-full px-4">
            <div className="flex flex-col h-full">
              {itemDetails.map((item) => (
                <CartList key={item.id} item={item} available={true} />
              ))}
            </div>
            <span className="text-italic">-- End Of Order --</span>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
}
