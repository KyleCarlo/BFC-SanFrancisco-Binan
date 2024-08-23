import { serverGetOrder } from "@hooks/getOrder";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/tabs";
import { serverGetCartDetails } from "@hooks/getCartDetails";
import CartList from "@components/customer/cart-list";
import OrderStatus from "@components/customer/orderWait/status";
import { ScrollArea } from "@components/ui/scroll-area";
import QRDownload from "@components/customer/orderWait/QRnDL";
import { OrderType } from "@/src/models/Order";

export default async function WaitingPage({
  params,
}: {
  params: { id: string };
}) {
  const { order, message: message_1 } = await serverGetOrder(params.id);

  if (!order) {
    return <h1>{message_1}</h1>;
  }

  const { itemDetails, message: message_2 } = await serverGetCartDetails(
    order.items
  );

  if (!itemDetails) {
    return <h1>{message_2}</h1>;
  }

  return (
    <div className="flex justify-center">
      <div className="h-dvh grid grid-rows-[0.2fr_1fr] overflow-hidden p-4 items-stretch justify-items-center text-center absolute top-0">
        <OrderStatus
          id={order.id as string}
          status={order.status}
          type={order.order_type as OrderType}
        />
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
              <div className="flex flex-col items-center">
                <QRDownload value={params.id} filename={params.id} />
              </div>
              <h1>
                Keep the QR for Tracking and <br /> Receiving the Order.
              </h1>
            </div>
          </TabsContent>
          <TabsContent value="order" className="h-2/3">
            <ScrollArea className="min-w-[300px] h-full px-4">
              <div className="flex flex-col h-full">
                {itemDetails.map((item) => (
                  <CartList key={item.id} item={item} available={true} />
                ))}
              </div>
              <p className="text-italic my-4">-- End Of Order --</p>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
