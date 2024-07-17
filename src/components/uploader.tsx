"use client";

import Uppy from "@uppy/core";
import { Dashboard } from "@uppy/react";
import { useState } from "react";
import Image from "next/image";

import "@uppy/core/dist/style.min.css";
import "@uppy/dashboard/dist/style.min.css";
import "@uppy/file-input/dist/style.min.css";
import "@uppy/image-editor/dist/style.min.css";
import { Button } from "./ui/button";

export function Uploader({
  uppy,
  width,
  height,
}: {
  uppy: Uppy<Record<string, unknown>>;
  width?: number;
  height?: number;
}) {
  return (
    <Dashboard
      uppy={uppy}
      width={width ?? 400}
      height={height ?? 250}
      className="flex items-center"
      hideUploadButton={true}
      hideRetryButton={true}
    />
  );
}

export function UploadEditor({
  imageName,
  imageURL,
  uppy,
  width,
  height,
}: {
  imageName: string;
  imageURL: string;
  uppy: Uppy<Record<string, unknown>>;
  width?: number;
  height?: number;
}) {
  const [edit, setEdit] = useState(false);
  return (
    <>
      {edit ? (
        <Uploader uppy={uppy} width={width} height={height} />
      ) : (
        <div className="h-[250px] flex flex-col items-center justify-center">
          <Image
            height={200}
            width={400}
            src={imageURL}
            alt={`Image of ${imageName}`}
            className="h-[210px] object-cover rounded-xl"
          />
          <Button
            variant="outline"
            size="sm"
            className="w-full py-2 my-2 flex-1"
            onClick={() => {
              setEdit(true);
            }}
          >
            Change Image
          </Button>
        </div>
      )}
    </>
  );
}
