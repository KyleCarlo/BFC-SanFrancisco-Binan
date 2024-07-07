import { Dispatch, SetStateAction } from "react";
import { Uppy } from "@uppy/core";
import { ItemType } from "@models/Menu";
import { Food } from "@models/Menu/Food";
import { Beverage } from "@models/Menu/Beverage";
import { toast } from "sonner";
import { validateVariation } from "@lib/utils";
import handleUppyUpload from "@lib/uppy-uploadHandler";

export async function editItem(
  values: Food | Beverage,
  uppy: Uppy<Record<string, unknown>, Record<string, unknown>>,
  itemType: ItemType,
  setOpen: Dispatch<SetStateAction<boolean>>
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
  } catch {
    toast.error("Unknown error occurred.");
  }
}
