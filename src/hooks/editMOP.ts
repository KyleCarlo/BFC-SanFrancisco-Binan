import { Dispatch, SetStateAction } from "react";
import { Uppy } from "@uppy/core";
import { ItemType } from "@models/Menu";
import { MOP } from "@models/MOP";
import { toast } from "sonner";
import handleUppyUpload from "@lib/uppy-uploadHandler";

export default async function editMOP(
  values: MOP,
  uppy: Uppy<Record<string, unknown>, Record<string, unknown>>,
  setOpen: Dispatch<SetStateAction<boolean>>
) {
  const uploadedFile = uppy.getFiles()[0];
  try {
    if (uploadedFile) {
      const filename = `${values.bank_name}.${uploadedFile.extension}`;
      const oldFilename = values.qr_code.split("/").pop()?.split("?")[0];

      uppy.setMeta({
        name: filename,
        bucket: "mop",
        oldName: oldFilename,
      });
      const uppy_result = await uppy.upload();
      const {
        proceed,
        message: { content, type },
        imageURL,
      } = await handleUppyUpload(uppy_result, filename, "mop");
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
      values.qr_code = imageURL;
    }

    const response = await fetch(`/api/mop`, {
      method: "PUT",
      body: JSON.stringify(values),
    });

    const { message } = await response.json();

    if (!response.ok) {
      toast.error(message);
      return;
    }

    toast.success(message);
  } catch {
    toast.error("An error occurred while editing the MOP.");
  }
}
