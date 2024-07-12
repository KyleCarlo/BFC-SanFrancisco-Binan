import { OrderTicketList } from "@models/OrderTicket";
import { ScrollArea } from "@components/ui/scroll-area";
import { Button } from "@components/ui/button";
import CartList from "./cart-list";

export default function CartOrderSubmission({
  orderList,
  quantity,
  total_cost,
}: {
  orderList: OrderTicketList;
  quantity: number;
  total_cost: number;
}) {
  return (
    <>
      <hr className="mt-3" />
      <ScrollArea className="p-3 flex-grow h-[70dvh]">
        <div className="flex flex-col">
          {orderList.map((item) => {
            return <CartList key={item.id} item={item} />;
          })}
        </div>
      </ScrollArea>
      <hr />
      <div className="grid grid-cols-[60%_20%_20%] justify-items-center px-3 py-3">
        <span className="justify-self-end">Total</span>
        <span className="text-bold">{quantity}</span>
        <span className="text-bold">₱ {total_cost}</span>
      </div>
      <div className="flex justify-center">
        <Button>Confirm Order</Button>
      </div>
    </>
  );
}
