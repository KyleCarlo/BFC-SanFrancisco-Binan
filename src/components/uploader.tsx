import React, { useEffect, useState } from "react";
import Uppy from "@uppy/core";
import { Dashboard } from "@uppy/react";
import XHRUpload from "@uppy/xhr-upload";
import ImageEditor from "@uppy/image-editor";

import "@uppy/core/dist/style.min.css";
import "@uppy/dashboard/dist/style.min.css";
import "@uppy/file-input/dist/style.min.css";
import "@uppy/image-editor/dist/style.min.css";

export default function Uploader() {
  // IMPORTANT: passing an initializer function to prevent Uppy from being reinstantiated on every render.

  const [uppy] = useState(() =>
    new Uppy({
      restrictions: { maxNumberOfFiles: 1, allowedFileTypes: ["image/*"] },
    })
      .use(XHRUpload, {
        endpoint: "http://localhost:3000/api/image",
        fieldName: "image",
        formData: true,
      })
      .use(ImageEditor, {
        // cropperOptions: {
        //   croppedCanvasOptions: {
        //     width: 200,
        //     height: 200,
        //   },
        // },
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
      })
  );

  return <Dashboard uppy={uppy} />;
}
