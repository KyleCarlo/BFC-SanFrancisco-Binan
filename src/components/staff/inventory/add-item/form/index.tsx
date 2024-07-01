import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@components/ui/button";
import { Form } from "@components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/tabs";
import { ScrollArea, ScrollBar } from "@components/ui/scroll-area";

import NameField from "./name-field";
import DescriptionField from "./desc-field";
import BeverageBaseField from "./beverage/base-field";
import FoodCategoryField from "./foodCategory-field";
import FeatureField from "./feature-field";
import BeverageTempField from "./beverage/temp-field";
import BeverageConcentrateField from "./beverage/concentrate-field";
import PriceField from "./price-field";
import ServingField from "./serving-field";

import Uploader from "@components/uploader";
import { useState } from "react";
import { staffUppy } from "@lib/uppy-config";

import { useItemTypeContext } from "@hooks/itemTypeContext";

import { Dispatch, SetStateAction } from "react";
import {
  foodFormSchema,
  beverageFormSchema,
  onSubmit,
} from "@hooks/addMenuItems";
import { useFieldArray } from "react-hook-form";
import { toast } from "sonner";
import Variations from "./variations";

export default function AddItemForm({
  setOpen,
}: {
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const { itemType } = useItemTypeContext();
  const formSchema =
    itemType === "beverage" ? beverageFormSchema : foodFormSchema;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      variations: [{ serving: "", price: "" }],
    },
  });
  const fieldArray = useFieldArray({
    name: "variations",
    control: form.control,
  });

  const [uppy] = useState(staffUppy);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) =>
          onSubmit(values, uppy, itemType, setOpen)
        )}
        className="space-y-2"
      >
        <Tabs defaultValue="details" className="w-[400px]">
          <TabsList>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="image">Image</TabsTrigger>
            <TabsTrigger value="variations">Variations</TabsTrigger>
          </TabsList>
          <TabsContent value="details">
            <NameField {...form} />
            <DescriptionField {...form} />
            <div className="flex gap-2 my-2">
              {itemType === "food" && <FoodCategoryField {...form} />}
              {itemType === "beverage" && <BeverageBaseField {...form} />}
              <FeatureField {...form} />
            </div>
          </TabsContent>
          <TabsContent value="image">
            <Uploader uppy={uppy} />
          </TabsContent>
          <TabsContent value="variations">
            <ScrollArea className="h-[200px]">
              {fieldArray.fields.map((field, index) => {
                return (
                  // <div className="grid grid-cols-2 gap-x-2 p-1" key={field.id}>
                  //   {/* FIX THIS */}
                  //   <div>
                  //     <ServingField form={form} index={index} />
                  //   </div>
                  //   <div>
                  //     <PriceField form={form} index={index} />
                  //   </div>
                  //   {itemType === "beverage" && (
                  //     <>
                  //       <BeverageTempField form={form} index={index} />
                  //       <BeverageConcentrateField form={form} index={index} />
                  //     </>
                  //   )}
                  // </div>
                  <Variations
                    form={form}
                    field={field}
                    index={index}
                    key={field.id}
                  />
                );
              })}
              <ScrollBar />
            </ScrollArea>
            <div className="flex">
              {fieldArray.fields.length > 1 && (
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full py-2 my-2 flex-1"
                  onClick={() => {
                    fieldArray.remove(fieldArray.fields.length - 1);
                  }}
                >
                  Remove Variation
                </Button>
              )}
              <Button
                variant="outline"
                size="sm"
                className="w-full py-2 my-2 flex-1"
                onClick={() => {
                  if (fieldArray.fields.length < 5)
                    fieldArray.append({ serving: "", price: "" });
                  else toast.warning("Max variations reached");
                }}
              >
                Add Variation
              </Button>
            </div>
          </TabsContent>
        </Tabs>

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
