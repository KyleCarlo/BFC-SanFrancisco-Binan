import { Dispatch, SetStateAction } from "react";
import { Uppy } from "@uppy/core";
import { ItemType } from "@models/Menu";
import { Food } from "@models/Menu/Food";
import { BeverageForm, FoodForm } from "@models/InventoryForm";
import { Beverage, BeverageVariation } from "@models/Menu/Beverage";
import { toast } from "sonner";
import { validateVariation } from "@lib/staff-utils";
import handleUppyUpload from "@lib/uppy-uploadHandler";
import { capitalize } from "@lib/utils";

export async function editItem(
  values: Food | Beverage,
  uppy: Uppy<Record<string, unknown>, Record<string, unknown>>,
  itemType: ItemType,
  setOpen: Dispatch<SetStateAction<boolean>>,
  setItemInventory: Dispatch<SetStateAction<Array<Food | Beverage>>>
) {
  const { isValid, message } = validateVariation(values.variations, itemType);

  if (!isValid) {
    return toast.error(message);
  }

  const parsed_variations = values.variations.map((variation) => {
    const { id, ...rest } = variation;
    return {
      id: id === -1 ? null : id,
      ...rest,
    };
  });

  const uploadedFile = uppy.getFiles()[0];

  try {
    if (uploadedFile) {
      const filename = `${values.name}.${uploadedFile.extension}`;
      const oldFilename = values.image.split("/").pop()?.split("?")[0];

      uppy.setMeta({
        name: filename,
        bucket: itemType,
        oldName: oldFilename,
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
      values.image = imageURL;
    }

    const response = await fetch(`/api/menu?itemType=${itemType}`, {
      method: "PUT",
      body: JSON.stringify({ ...values, variations: parsed_variations }),
    });

    const { message } = await response.json();

    if (!response.ok) {
      toast.error(message);
      return setOpen(false);
    }

    toast.success(message);
    setOpen(false);

    const item = {
      ...values,
      feature: capitalize(values.feature),
    } as Food | Beverage;

    if (itemType === "food") {
      (item as FoodForm).category = capitalize(
        (values as FoodForm).category
      ) as Food["category"];
    } else {
      (item as BeverageForm).variations.forEach((variation, index) => {
        if (!variation.concentrate) {
          const hot_cold = (item as BeverageForm).variations[index]
            .hot_cold as string;
          (item as BeverageForm).variations[index].hot_cold = capitalize(
            hot_cold
          ) as BeverageVariation["hot_cold"];
        }
      });
      (item as BeverageForm).base = capitalize(
        (values as BeverageForm).base
      ) as Beverage["base"];
    }

    setItemInventory((prev) => {
      const new_items = prev.map((prevItem) => {
        if (prevItem.id === item.id) {
          return item;
        }
        return prevItem;
      });
      return new_items;
    });
  } catch {
    toast.error("Unknown error occurred.");
  }
}
