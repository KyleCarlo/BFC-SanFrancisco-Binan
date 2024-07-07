import Uppy from "@uppy/core";
import XHRUpload from "@uppy/xhr-upload";
import ImageEditor from "@uppy/image-editor";

export const staffUppy = (formType: "create" | "update") =>
  new Uppy({
    autoProceed: false,
    restrictions: { maxNumberOfFiles: 1, allowedFileTypes: ["image/*"] },
  })
    .use(XHRUpload, {
      endpoint: "/api/image",
      method: formType === "create" ? "POST" : "PUT",
      fieldName: "image",
      formData: true,
    })
    .use(ImageEditor, {
      actions: {
        revert: true,
        rotate: true,
        granularRotate: true,
        flip: false,
        zoomIn: true,
        zoomOut: true,
        cropSquare: true,
        cropWidescreen: false,
        cropWidescreenVertical: false,
      },
    });
