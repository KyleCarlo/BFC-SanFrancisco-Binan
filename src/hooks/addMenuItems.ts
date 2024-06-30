import { z } from "zod";
import { toast } from "sonner";
import { BeverageModel } from "@models/Menu/Beverage";
import { FoodModel } from "@models/Menu/Food";
import { Uppy } from "@uppy/core";
import { Dispatch, SetStateAction } from "react";
import { ItemType } from "@models/Menu";

export const beverageSchema = BeverageModel.pick({
  name: true,
  description: true,
  base: true,
  feature: true,
});

export const foodSchema = FoodModel.pick({
  name: true,
  description: true,
  category: true,
  feature: true,
});

export async function onSubmit(
  values: z.infer<typeof beverageSchema> | z.infer<typeof foodSchema>,
  uppy: Uppy<Record<string, unknown>, Record<string, unknown>>,
  itemType: ItemType,
  setOpen: Dispatch<SetStateAction<boolean>>
) {
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
        body: JSON.stringify({
          ...values,
          image: `${values.name}.${uploadedFile.extension}`,
        }),
      }
    );

    const res_message = (await res.json()).message;

    if (!res.ok) {
      toast.error(res_message);
    } else {
      const uppy_res = await uppy.upload();
      if (uppy_res.successful.length == 0) {
        toast.error(
          "Image upload failed. Try to refresh the page or image duplicated."
        );
      } else {
        toast.success(res_message);
        setOpen(false);
      }
    }
  } catch {
    toast.error("Unknown error occured.");
  }
}
