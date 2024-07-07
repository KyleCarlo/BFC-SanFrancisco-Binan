import { toast } from "sonner";
import { BeverageVariation } from "@models/Menu/Beverage";
import { FoodVariation } from "@models/Menu/Food";
import { Uppy } from "@uppy/core";
import { Dispatch, SetStateAction } from "react";
import { ItemType } from "@models/Menu";
import { validateVariation } from "@lib/utils";
import handleUppyUpload from "@lib/uppy-uploadHandler";
import { BeverageForm, FoodForm } from "@/src/models/Form";

export async function addItem(
  values: BeverageForm | FoodForm,
  uppy: Uppy<Record<string, unknown>, Record<string, unknown>>,
  itemType: ItemType,
  setOpen: Dispatch<SetStateAction<boolean>>
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
    return toast.error("Please upload an image.");
  }

  const filename = `${values.name}.${uploadedFile.extension}`;

  try {
    const unique_name = await fetch(
      `/api/menu/check_name?name=${values.name}&itemType=${itemType}`
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
  } catch {
    toast.error("Unknown error occurred.");
  }
}
