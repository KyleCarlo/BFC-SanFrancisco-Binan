import { serverGetCustomer } from "@hooks/getCustomer";
import { Progress } from "@components/ui/progress";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/tabs";
import { ScrollArea } from "@components/ui/scroll-area";
import dayjs from "@lib/dayjs";
import { serverGetVouchers } from "@hooks/getVouchers";
import VoucherList from "@components/customer/voucher/list";
import AvailVoucher from "@components/customer/voucher/avail";

export default async function AccountPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { voucher?: string };
}) {
  const { id } = params;
  const { customer, message: message_1 } = await serverGetCustomer(id);
  if (!customer) {
    return <div>{message_1}</div>;
  }
  const { vouchers, message: message_2 } = await serverGetVouchers(id);
  if (!vouchers) {
    return <div>{message_2}</div>;
  }
  if (searchParams.voucher) {
    const selected_voucher = vouchers.find(
      (voucher) => voucher.id === searchParams.voucher
    );
    if (selected_voucher) {
      return (
        <div className="absolute top-0 w-full">
          <AvailVoucher selected_voucher={selected_voucher} />
        </div>
      );
    }
  }

  return (
    <main className="h-dvh w-full flex flex-col justify-center items-center gap-2 absolute top-0">
      <div className="p-5 rounded-xl w-[280px] bg-[#27272A]">
        <div className="mb-4">
          <h1 className="text-xl text-bold">
            {customer.first_name} {customer.last_name}
          </h1>
          <p className="text-xs text-gray-400">ID: {customer.id}</p>
        </div>
        <p className="text-gold text-italic text-end text-xs pr-3 pb-1">
          {100 - customer.points <= 0
            ? `Claim a Reward!`
            : `${100 - customer.points} ⭐ to a Reward`}
        </p>
        <div className="flex items-center relative">
          <Progress value={customer.points} className="h-10" />
          <Image
            width={48}
            height={48}
            src="/star.svg"
            alt="Points"
            className="absolute right-[-4px]"
          />
        </div>
        <div className="grid grid-cols-5 text-xs justify-items-end relative left-2">
          <h1>20</h1>
          <h1>40</h1>
          <h1>60</h1>
          <h1>80</h1>
        </div>
      </div>
      <Tabs defaultValue="details" className="w-[280px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="voucher">Vouchers</TabsTrigger>
        </TabsList>
        <TabsContent value="details">
          <div className="w-[280px] h-[243.2px] rounded-lg border-2 py-4 flex flex-col gap-4">
            <div className="text-center">
              <p className="text-xs text-gray-400">Balance</p>
              <p>{customer.points} ⭐</p>
            </div>
            <div className="flex justify-evenly">
              <div>
                <p className="text-xs text-gray-400">First Name</p>
                <p>{customer.first_name}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Last Name</p>
                <p>{customer.last_name}</p>
              </div>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-400">Email</p>
              <p>{customer.email}</p>
            </div>
            <div className="flex justify-evenly">
              <div>
                <p className="text-xs text-gray-400">Birthday</p>
                <p>{dayjs(customer.birthday).format("MMM DD YYYY")}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Loyal Since</p>
                <p>{dayjs(customer.created_at).format("MMM DD YYYY")}</p>
              </div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="voucher">
          <ScrollArea
            className={`w-[280px] h-[243.2px] rounded-lg border-2 flex flex-col gap-4 ${
              vouchers.length > 0 && "pr-3"
            }`}
          >
            {vouchers.length > 0 ? (
              <div className="py-3">
                {vouchers.map((voucher, index) => {
                  return (
                    <VoucherList
                      key={index}
                      voucher={voucher}
                      customer_id={id}
                    />
                  );
                })}
              </div>
            ) : (
              <div className="h-[215px] flex items-center justify-center">
                <p>No Vouchers Available.</p>
              </div>
            )}
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </main>
  );
}
