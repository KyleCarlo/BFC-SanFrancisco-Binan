import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@components/ui/button";
import { Form } from "@components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/tabs";

import NameField from "./name-field";
import DescriptionField from "./desc-field";
import BeverageBaseField from "./beverageBase-field";
import FoodCategoryField from "./foodCategory-field";
import FeatureField from "./feature-field";

import Uploader from "@components/uploader";
import { useState } from "react";
import { staffUppy } from "@lib/uppy-config";

import { useItemTypeContext } from "@hooks/itemTypeContext";

import { Dispatch, SetStateAction } from "react";
import { foodSchema, beverageSchema, onSubmit } from "@hooks/addMenuItems";

export default function AddItemForm({
  setOpen,
}: {
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const { itemType } = useItemTypeContext();
  const formSchema = itemType === "beverage" ? beverageSchema : foodSchema;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
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
        </Tabs>

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
