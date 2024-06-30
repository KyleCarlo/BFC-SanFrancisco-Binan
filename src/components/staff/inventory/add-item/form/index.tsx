import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@components/ui/button";
import { Form } from "@components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/tabs";
import { BeverageModel } from "@models/Menu/Beverage";

import NameField from "./name-field";
import DescriptionField from "./desc-field";
import BeverageBaseField from "./beverageBase-field";
import FoodCategoryField from "./foodCategory-field";
import FeatureField from "./feature-field";

import Uploader from "@components/uploader";
import { useState } from "react";
import { Uppy } from "@uppy/core";
import XHRUpload from "@uppy/xhr-upload";
import ImageEditor from "@uppy/image-editor";
import { toast } from "sonner";

import { useItemTypeContext } from "@hooks/itemTypeContext";
import { FoodModel } from "@models/Menu/Food";

import { Dispatch, SetStateAction } from "react";

const beverageSchema = BeverageModel.pick({
  name: true,
  description: true,
  base: true,
  feature: true,
});

const foodSchema = FoodModel.pick({
  name: true,
  description: true,
  category: true,
  feature: true,
});

export default function AddItemForm({
  setOpen,
}: {
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const { itemType } = useItemTypeContext();
  const formSchema = itemType === "beverage" ? beverageSchema : foodSchema;

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const uploadedFile = uppy.getFiles()[0];
    if (!uploadedFile) {
      return toast.error("Please upload an image.");
    }
    uppy.setMeta({
      name: `${values.name}.${uploadedFile.extension}`,
      bucket: itemType,
    });
    try {
      const res = await fetch(
        `http://localhost:3000/api/menu?itemType=${itemType}`,
        {
          method: "PUT",
          body: JSON.stringify({ ...values, image: uploadedFile.name }),
        }
      );

      if (!res.ok) {
        toast.error(res.statusText);
      } else {
        const uppy_res = await uppy.upload();
        if (uppy_res.successful.length == 0) {
          toast.error(
            "Image upload failed. Try to refresh the page or image duplicated."
          );
        } else {
          toast.success("Image uploaded successfully.");
          setOpen(false);
        }
      }
    } catch {
      toast.error("Unknown error occured.");
    }
  }

  const [uppy] = useState(() =>
    new Uppy({
      autoProceed: false,
      restrictions: { maxNumberOfFiles: 1, allowedFileTypes: ["image/*"] },
    })
      .use(XHRUpload, {
        endpoint: "http://localhost:3000/api/image",
        method: "POST",
        fieldName: "image",
        formData: true,
      })
      .use(ImageEditor, {
        actions: {
          revert: true,
          rotate: true,
          granularRotate: true,
          flip: false,
          zoomIn: true,
          zoomOut: true,
          cropSquare: true,
          cropWidescreen: false,
          cropWidescreenVertical: false,
        },
      })
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
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
