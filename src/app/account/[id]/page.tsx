import { serverGetCustomer } from "@hooks/getCustomer";
import { Progress } from "@components/ui/progress";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/tabs";
import QRDownload from "@components/customer/orderWait/QRnDL";
import dayjs from "@lib/dayjs";

export default async function AccountPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const { customer, message } = await serverGetCustomer(id);
  if (!customer) {
    return <div>{message}</div>;
  }
  return (
    <main className="h-dvh flex flex-col justify-center items-center gap-2">
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
          <TabsTrigger value="claim">Claim</TabsTrigger>
        </TabsList>
        <TabsContent value="details">
          <div className="w-[280px] rounded-lg border-2 py-4 flex flex-col gap-4">
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
        <TabsContent value="claim">
          <div className="w-[280px]">
            <QRDownload id={id} />
          </div>
        </TabsContent>
      </Tabs>
    </main>
  );
}
