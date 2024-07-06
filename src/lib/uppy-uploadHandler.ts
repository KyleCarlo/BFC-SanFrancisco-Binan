import { UploadResult } from "@uppy/core";

export default async function handleUppyUpload(
  result: UploadResult<Record<string, unknown>, Record<string, unknown>>,
  filename: string,
  bucket: string
) {
  if (result.successful.length === 0) {
    const response = await fetch(
      `/api/image?bucket=${bucket}&filename=${filename}`,
      {
        method: "GET",
      }
    );

    if (!response.ok) {
      return {
        proceed: false,
        message: { content: "Image upload failed.", type: "error" },
      };
    }

    const { presignedUrl } = await response.json();
    return {
      proceed: true,
      message: { content: "Image replaced.", type: "warning" },
      imageURL: presignedUrl,
    };
  }

  if (result.successful.length > 0) {
    const upload_response = result.successful[0].response;

    if (upload_response) {
      const { imageURL, message } = upload_response.body;
      return {
        proceed: true,
        message: { content: message as string, type: "success" },
        imageURL,
      };
    }
  }

  return {
    proceed: false,
    message: { content: "Image upload failed.", type: "error" },
  };
}
