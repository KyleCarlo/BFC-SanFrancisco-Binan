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

import Uploader from "@components/uploader";
import { useState } from "react";
import { staffUppy } from "@lib/uppy-config";

import { useItemTypeContext } from "@hooks/itemTypeContext";

import { Dispatch, SetStateAction } from "react";
import {
  foodFormSchema,
  beverageFormSchema,
  addItem,
} from "@hooks/addMenuItems";
import { useFieldArray } from "react-hook-form";
import { toast } from "sonner";
import Variations from "./variations";
import { Beverage } from "@models/Menu/Beverage";
import { Food } from "@models/Menu/Food";
import { parseDefaultValues } from "@lib/utils";

export default function ItemForm({
  setOpen,
  inputValues,
  formType,
}: {
  setOpen: Dispatch<SetStateAction<boolean>>;
  inputValues?: Food | Beverage;
  formType: "create" | "update";
}) {
  const { itemType } = useItemTypeContext();
  const formSchema =
    itemType === "beverage" ? beverageFormSchema : foodFormSchema;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: !inputValues
      ? {
          variations: [{ serving: "", price: "", available: true }],
        }
      : parseDefaultValues(inputValues),
  });

  const fieldArray = useFieldArray({
    name: "variations",
    control: form.control,
  });

  const [uppy] = useState(staffUppy);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) => {
          console.table(values);
          console.table(values.variations);
          if (formType === "create") {
            addItem(values, uppy, itemType, setOpen);
          } else if (formType === "update") {
            // updateItem(values, uppy, itemType, setOpen);
            console.log("update");
          }
        })}
        className="space-y-2"
      >
        <Tabs defaultValue="details" className="w-[400px]">
          <TabsList>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="image">Image</TabsTrigger>
            <TabsTrigger value="variations">Variations</TabsTrigger>
          </TabsList>
          <TabsContent value="details">
            <NameField form={form} />
            <DescriptionField form={form} />
            <div className="flex gap-2 my-2">
              {itemType === "food" && <FoodCategoryField form={form} />}
              {itemType === "beverage" && <BeverageBaseField form={form} />}
              <FeatureField {...form} />
            </div>
          </TabsContent>
          <TabsContent value="image">
            {formType === "create" && <Uploader uppy={uppy} />}
            {formType === "update" && <p>IMAGE UPLOADED</p>}
          </TabsContent>
          <TabsContent value="variations">
            <ScrollArea className="h-[200px]">
              {fieldArray.fields.map((field, index) => {
                return (
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
            <div className="flex gap-2">
              {fieldArray.fields.length > 1 && (
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full py-2 my-2 flex-1"
                  onClick={(e) => {
                    e.preventDefault();
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
                onClick={(e) => {
                  e.preventDefault();
                  if (fieldArray.fields.length < 5)
                    fieldArray.append({
                      serving: "",
                      price: "",
                      available: true,
                    });
                  else toast.warning("Max variations reached");
                }}
              >
                Add Variation
              </Button>
            </div>
          </TabsContent>
        </Tabs>

        <Button type="submit">
          {formType === "create" ? "Add Item" : "Save Changes"}
        </Button>
      </form>
    </Form>
  );
}
