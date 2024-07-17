"use client";

import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { MOP, MOPModel } from "@models/MOP";
import { zodResolver } from "@hookform/resolvers/zod";
import addMOP from "@hooks/addMOP";
import editMOP from "@hooks/editMOP";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@components/ui/form";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { Uploader, UploadEditor } from "@components/uploader";
import { staffUppy } from "@lib/uppy-config";
import { useState } from "react";
import { parseDefaultMOPValues } from "@lib/staff-utils";

export default function MOPForm({
  setOpen,
  formType,
  defaultValues,
}: {
  setOpen: Dispatch<SetStateAction<boolean>>;
  formType: "create" | "update";
  defaultValues?: MOP;
}) {
  const form = useForm<MOP>({
    resolver: zodResolver(MOPModel),
    defaultValues: parseDefaultMOPValues(defaultValues),
  });
  const [uppy] = useState(staffUppy(formType === "create" ? "POST" : "PUT"));

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((values) => {
            if (formType === "create") {
              addMOP(values.acct_name, values.bank_name, uppy);
            } else {
              editMOP(values, uppy, setOpen);
            }
          })}
        >
          <FormField
            control={form.control}
            name="bank_name"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Bank Name</FormLabel>
                  <FormControl>
                    <Input {...field} className="w-full relative bottom-1.5" />
                  </FormControl>
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="acct_name"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Account Name</FormLabel>
                  <FormControl>
                    <Input {...field} className="w-full relative bottom-1.5" />
                  </FormControl>
                </FormItem>
              );
            }}
          />
          <div>
            <FormLabel>QR Code</FormLabel>
            {formType === "create" ? (
              <Uploader uppy={uppy} height={130} />
            ) : (
              <UploadEditor
                imageName={defaultValues?.bank_name as string}
                imageURL={defaultValues?.qr_code as string}
                uppy={uppy}
                height={130}
              />
            )}
          </div>
          <Button type="submit" className="mt-4">
            {formType === "create" ? "Add" : "Edit"}
          </Button>
        </form>
      </Form>
    </>
  );
}
