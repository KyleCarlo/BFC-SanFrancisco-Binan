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
import { validateVariation } from "../lib/utils";
import handleUppyUpload from "@lib/uppy-uploadHandler";

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
  const { isValid, message } = validateVariation(
    values.variations as BeverageVariation[],
    itemType
  );
  if (!isValid) {
    return toast.error(message);
  }

  const uploadedFile = uppy.getFiles()[0];
  if (!uploadedFile) {
    return toast.error("Please upload an image.");
  }

  const filename = `${values.name}.${uploadedFile.extension}`;

  try {
    const unique_name = await fetch(
      `http://localhost:3000/api/menu/check_name?name=${values.name}&itemType=${itemType}`
    );

    if (!unique_name.ok) {
      return toast.error("Item name already exists.");
    }

    uppy.setMeta({
      name: filename,
      bucket: itemType,
    });

    const uppy_result = await uppy.upload();

    const {
      proceed,
      message: { content, type },
      imageURL,
    } = await handleUppyUpload(uppy_result, filename, itemType);
    switch (type) {
      case "error":
        toast.error(content);
        break;
      case "warning":
        toast.warning(content);
        break;
      case "success":
        toast.success(content);
        break;
    }
    if (!proceed) {
      return;
    }

    const response = await fetch(
      `http://localhost:3000/api/menu?itemType=${itemType}`,
      {
        method: "POST",
        body: JSON.stringify({
          ...values,
          image: imageURL,
        }),
      }
    );

    const { message } = await response.json();

    if (!response.ok) {
      await fetch(
        `http://localhost:3000/api/image?bucket=${itemType}&filename=${filename}`,
        {
          method: "DELETE",
        }
      );
      return toast.error(message);
    }

    toast.success(message);
    setOpen(false);
  } catch {
    toast.error("Unknown error occurred.");
  }
}
