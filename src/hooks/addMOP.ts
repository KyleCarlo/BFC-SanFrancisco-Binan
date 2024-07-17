import { Uppy } from "@uppy/core";
import { toast } from "sonner";
import handleUppyUpload from "@lib/uppy-uploadHandler";

export default async function addMOP(
  acct_name: string,
  bank_name: string,
  uppy: Uppy<Record<string, unknown>, Record<string, unknown>>
) {
  const uploadedFile = uppy.getFiles()[0];
  if (!uploadedFile) {
    return toast.error("Please Upload a QRCode.");
  }

  const filename = `${bank_name}.${uploadedFile.extension}`;
  try {
    const unique_name = await fetch(
      `/api/mop/check/bank_name?name=${bank_name}`
    );

    if (!unique_name.ok) {
      return toast.error("Bank Name Already Exists.");
    }

    uppy.setMeta({
      name: filename,
      bucket: "mop",
    });

    const uppy_result = await uppy.upload();
    const {
      proceed,
      message: { content, type },
      imageURL,
    } = await handleUppyUpload(uppy_result, filename, "MOP");

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

    const response = await fetch(`/api/mop`, {
      method: "POST",
      body: JSON.stringify({
        acct_name,
        bank_name,
        qr_code: imageURL,
      }),
    });

    const { message } = await response.json();

    if (!response.ok) {
      await fetch(`/api/image?bucket=mop&filename=${filename}`, {
        method: "DELETE",
      });
      return toast.error(message);
    }

    toast.success(message);
  } catch {
    toast.error("Unknown error occurred.");
  }
}
