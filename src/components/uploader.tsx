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

export function Uploader({ uppy }: { uppy: Uppy<Record<string, unknown>> }) {
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

export function UploadEditor({
  imageName,
  imageURL,
  uppy,
}: {
  imageName: string;
  imageURL: string;
  uppy: Uppy<Record<string, unknown>>;
}) {
  const [edit, setEdit] = useState(false);
  return (
    <>
      {edit ? (
        <Uploader uppy={uppy} />
      ) : (
        <div className="h-[250px]">
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
