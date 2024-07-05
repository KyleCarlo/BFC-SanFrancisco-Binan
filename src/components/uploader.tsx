"use client";

import Uppy from "@uppy/core";
import { Dashboard } from "@uppy/react";

import "@uppy/core/dist/style.min.css";
import "@uppy/dashboard/dist/style.min.css";
import "@uppy/file-input/dist/style.min.css";
import "@uppy/image-editor/dist/style.min.css";

export default function Uploader({
  uppy,
}: {
  uppy: Uppy<Record<string, unknown>>;
}) {
  return (
    <Dashboard
      uppy={uppy}
      width={400}
      height={250}
      className="flex items-center"
      hideUploadButton={true}
      hideRetryButton={true}
    />
  );
}
