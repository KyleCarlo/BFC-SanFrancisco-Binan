import { UseFormReturn } from "react-hook-form";
import { Order } from "@models/Order";
import { Input } from "@components/ui/input";
import {
  FormField,
  FormLabel,
  FormItem,
  FormControl,
} from "@components/ui/form";

export function PersonalDetailsField({ form }: { form: UseFormReturn<Order> }) {
  return (
    <div className="p-2">
      <FormField
        control={form.control}
        name="receiver_details.name"
        render={({ field }) => {
          return (
            <FormItem className="grid grid-cols-[0px_1fr] items-center">
              <FormLabel className="pl-2">Name</FormLabel>
              <FormControl className="m-0">
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
              <FormLabel className="pl-2 text-xs text-nowrap">
                Contact #
              </FormLabel>
              <FormControl className="m-0">
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
          <FormField
            control={form.control}
            name="receiver_details.vehicle_plate"
            render={({ field }) => {
              return (
                <FormItem className="grid grid-cols-[0px_1fr] items-center">
                  <FormLabel className="pl-2 text-xs text-nowrap">
                    Vehicle Plate
                  </FormLabel>
                  <FormControl className="m-0">
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
            name="receiver_details.vehicle_color"
            render={({ field }) => {
              return (
                <FormItem className="grid grid-cols-[0px_1fr] items-center">
                  <FormLabel className="pl-2 text-xs text-nowrap">
                    Vehicle Color
                  </FormLabel>
                  <FormControl className="m-0">
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
        </>
      )}
    </div>
  );
}
