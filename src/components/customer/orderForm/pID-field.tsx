import { UseFormReturn } from "react-hook-form";
import { Order } from "@models/Order";
import { Input } from "@components/ui/input";
import {
  FormField,
  FormLabel,
  FormItem,
  FormControl,
} from "@components/ui/form";
import ParkingField from "@components/parking-field";

export default function PersonalDetailsField({
  form,
}: {
  form: UseFormReturn<Order>;
}) {
  return (
    <div className="p-2">
      <FormField
        control={form.control}
        name="receiver_details.name"
        render={({ field }) => {
          return (
            <FormItem className="grid grid-cols-[0px_1fr] items-center">
              <FormLabel className="pl-2">Name</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="pl-[90px] w-full relative bottom-1"
                  autoComplete="false"
                />
              </FormControl>
            </FormItem>
          );
        }}
      />
      <FormField
        control={form.control}
        name="receiver_details.contact_number"
        render={({ field }) => {
          return (
            <FormItem className="grid grid-cols-[0px_1fr] items-center">
              <FormLabel className="pl-2 text-nowrap">Contact No.</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="tel"
                  className="pl-[90px] w-full relative bottom-1"
                  autoComplete="false"
                />
              </FormControl>
            </FormItem>
          );
        }}
      />
      <FormField
        control={form.control}
        name="receiver_details.comments"
        render={({ field }) => {
          return (
            <FormItem className="grid grid-cols-[0px_1fr] items-center">
              <FormLabel className="pl-2 text-nowrap">Comments</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="pl-[90px] w-full relative bottom-1"
                  autoComplete="false"
                />
              </FormControl>
            </FormItem>
          );
        }}
      />
      {form.watch("order_type") === "ParkNGo" && (
        <>
          <h1 className="-ml-2 text-bold">Vehicle Info</h1>
          <FormField
            control={form.control}
            name="receiver_details.vehicle_plate"
            render={({ field }) => {
              return (
                <FormItem className="grid grid-cols-[0px_1fr] items-center">
                  <FormLabel className="pl-2 text-nowrap">Plate No.</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="pl-[90px] w-full relative bottom-1"
                      autoComplete="false"
                    />
                  </FormControl>
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="receiver_details.vehicle_description"
            render={({ field }) => {
              return (
                <FormItem className="grid grid-cols-[0px_1fr] items-center">
                  <FormLabel className="pl-2 text-nowrap">
                    Description
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="pl-[90px] w-full relative bottom-1"
                      autoComplete="false"
                      placeholder="Color or Model"
                    />
                  </FormControl>
                </FormItem>
              );
            }}
          />
          <ParkingField form={form} />
        </>
      )}
      <div>
        <p className="text-xs opacity-70 text-justify">
          We collect your personal info solely to track and fulfill your order.
          Your data is kept secure and never shared with third parties.
        </p>
      </div>
    </div>
  );
}
