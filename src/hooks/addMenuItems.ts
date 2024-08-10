import { toast } from "sonner";
import { BeverageVariation } from "@models/Menu/Beverage";
import { FoodVariation } from "@models/Menu/Food";
import { Uppy } from "@uppy/core";
import { Dispatch, SetStateAction } from "react";
import { ItemType } from "@models/Menu";
import { validateVariation } from "@lib/staff-utils";
import handleUppyUpload from "@lib/uppy-uploadHandler";
import { BeverageForm, FoodForm } from "@models/InventoryForm";
import { Food } from "@models/Menu/Food";
import { Beverage } from "@models/Menu/Beverage";
import { capitalize } from "@lib/utils";

export async function addItem(
  values: BeverageForm | FoodForm,
  uppy: Uppy<Record<string, unknown>, Record<string, unknown>>,
  itemType: ItemType,
  setOpen: Dispatch<SetStateAction<boolean>>,
  setItemInventory: Dispatch<SetStateAction<Array<Food | Beverage>>>
) {
  const { isValid, message } = validateVariation(
    values.variations as BeverageVariation[] | FoodVariation[],
    itemType
  );
  if (!isValid) {
    return toast.error(message);
  }

  const uploadedFile = uppy.getFiles()[0];
  if (!uploadedFile) {
    return toast.error("Please Upload an Image.");
  }

  const filename = `${values.name}.${uploadedFile.extension}`;

  try {
    const unique_name = await fetch(
      `/api/menu/check/name?name=${values.name}&itemType=${itemType}`
    );

    if (!unique_name.ok) {
      return toast.error("Item Name Already Exists.");
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

    const response = await fetch(`/api/menu?itemType=${itemType}`, {
      method: "POST",
      body: JSON.stringify({
        ...values,
        image: imageURL,
      }),
    });

    const { message } = await response.json();

    if (!response.ok) {
      await fetch(`/api/image?bucket=${itemType}&filename=${filename}`, {
        method: "DELETE",
      });
      return toast.error(message);
    }

    toast.success(message);
    setOpen(false);
    const item = {
      ...values,
      feature: capitalize(values.feature),
      image: imageURL,
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
    setItemInventory((prev) => [
      ...prev,
      {
        ...item,
        variations: item.variations.map((v) => {
          return {
            ...v,
            price: (v.price as number).toFixed(2),
          };
        }),
      } as Food | Beverage,
    ]);
  } catch {
    toast.error("Unknown error occurred.");
  }
}
