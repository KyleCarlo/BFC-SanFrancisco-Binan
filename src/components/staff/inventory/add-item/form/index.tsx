"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@components/ui/button";
import { Form } from "@components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/tabs";
import { BeverageModel } from "@models/Menu/Beverage";

import NameField from "./name-field";
import DescriptionField from "./desc-field";
import BeverageBaseField from "./beverageBase-field";
import FeatureField from "./feature-field";

import Uploader from "@components/uploader";
import { useEffect, useState } from "react";
import { Uppy } from "@uppy/core";
import XHRUpload from "@uppy/xhr-upload";
import ImageEditor from "@uppy/image-editor";

const formSchema = BeverageModel.pick({
  name: true,
  image: true,
  description: true,
  base: true,
  feature: true,
});

export default function AddItemForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    const res = uppy.upload();
    console.log(res);
  }

  const [imageName, setImageName] = useState("");

  const [uppy] = useState(() =>
    new Uppy({
      autoProceed: false,
      restrictions: { maxNumberOfFiles: 1, allowedFileTypes: ["image/*"] },
    })
      .use(XHRUpload, {
        endpoint: "https://localhost:3000/image",
        method: "POST",
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

  useEffect(() => {
    uppy.on("files-added", (file) => {
      console.log(file);
    });
  }, [uppy]);

  return (
    <Form {...form}>
      <form
        id="beverage"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-2"
      >
        <Tabs defaultValue="details" className="w-[400px]">
          <TabsList>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="image">Image</TabsTrigger>
          </TabsList>
          <TabsContent value="details">
            <NameField {...form} />
            <DescriptionField {...form} />
            <div className="flex gap-2 my-2">
              <BeverageBaseField {...form} />
              <FeatureField {...form} />
            </div>
          </TabsContent>
          <TabsContent value="image">
            <Uploader uppy={uppy} />
          </TabsContent>
        </Tabs>

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
