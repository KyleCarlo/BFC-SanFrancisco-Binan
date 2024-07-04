import { z } from "zod";
import { toast } from "sonner";
import {
  BeverageModel,
  BeverageVariation,
  BeverageVariationModel,
} from "@models/Menu/Beverage";
import { FoodModel, FoodVariationModel } from "@models/Menu/Food";
import { Uppy } from "@uppy/core";
import { Dispatch, SetStateAction } from "react";
import { ItemType } from "@models/Menu";
import { validateBeverageVariation } from "../lib/utils";

export const beverageFormSchema = BeverageModel.pick({
  name: true,
  description: true,
  base: true,
  feature: true,
}).merge(
  z.object({
    variations: z.array(
      BeverageVariationModel.pick({
        serving: true,
        price: true,
        concentrate: true,
        hot_cold: true,
        available: true,
      })
    ),
  })
);

export const foodFormSchema = FoodModel.pick({
  name: true,
  description: true,
  category: true,
  feature: true,
}).merge(
  z.object({
    variations: z.array(
      FoodVariationModel.pick({ serving: true, price: true, available: true })
    ),
  })
);

export async function addItem(
  values: z.infer<typeof beverageFormSchema> | z.infer<typeof foodFormSchema>,
  uppy: Uppy<Record<string, unknown>, Record<string, unknown>>,
  itemType: ItemType,
  setOpen: Dispatch<SetStateAction<boolean>>
) {
  if (itemType === "beverage") {
    const { isValid, message } = validateBeverageVariation(
      values.variations as BeverageVariation[]
    );
    if (!isValid) {
      return toast.error(message);
    }
  }

  const uploadedFile = uppy.getFiles()[0];
  if (!uploadedFile) {
    return toast.error("Please upload an image.");
  }
  uppy.setMeta({
    name: `${values.name}.${uploadedFile.extension}`,
    bucket: itemType,
  });
  try {
    const response = await fetch(
      `http://localhost:3000/api/menu?itemType=${itemType}`,
      {
        method: "POST",
        body: JSON.stringify({
          ...values,
          image: `${values.name}.${uploadedFile.extension}`,
        }),
      }
    );

    const { message } = await response.json();

    if (!response.ok) {
      return toast.error(message);
    }

    const uppy_res = await uppy.upload();
    if (uppy_res.successful.length == 0) {
      return toast.error(
        "Image upload failed. Try to refresh the page or image duplicated."
      );
    }

    toast.success(message);
    setOpen(false);
  } catch {
    toast.error("Unknown error occurred.");
  }
}
