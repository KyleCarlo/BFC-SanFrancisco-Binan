"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type EmailForm, EmailFormModel } from "@models/EmailForm";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@components/ui/form";
import { Textarea } from "@components/ui/textarea";
import { Input } from "@components/ui/input";
import { Button } from "@components/ui/button";
import { sendInquiry } from "@hooks/sendInquiry";
import { useState } from "react";
import BFCLogo from "@public/bfc-logo.png";
import Image from "next/image";

export default function EmailForm() {
  const [successful, setSuccessful] = useState<boolean>(false);
  const [sending, setSending] = useState<boolean>(false);
  const form = useForm<EmailForm>({
    resolver: zodResolver(EmailFormModel),
    defaultValues: {
      name: "",
      email: "",
      phone_number: "",
      message: "",
    },
  });

  return (
    <div className="relative scale-125 max-[1210px]:scale-105 max-[960px]:w-[300px] max-[350px]:w-[250px] h-[284px] max-[500px]:bottom-7">
      <div
        className={`flex flex-col justify-center items-center gap-4 transition-all w-full max-[960px]:w-[300px] h-[284px] absolute top-0 ${
          successful ? "opacity-100" : "opacity-0"
        }`}
      >
        <Image width={70} height={70} src={BFCLogo} alt="BFC Logo" />
        <h1 className="text-center">
          <span className="text-[--gold]">We Received Your Inquiry.</span>
          <br />
          We will get back to you
          <br />
          as soon as possible.
        </h1>
      </div>
      <div
        className={`transition-all ${successful ? "opacity-0" : "opacity-100"}`}
      >
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((values) => {
              sendInquiry(values, setSuccessful, setSending);
            })}
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormLabel className="text-bold">Name</FormLabel>
                  <FormControl className="absolute">
                    <Input
                      {...field}
                      className="w-full relative -top-2 bg-white text-black"
                    />
                  </FormControl>
                  <FormMessage className="absolute bottom-[10px] left-1 text-xs" />
                </FormItem>
              )}
            />
            <div className="flex gap-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="relative">
                    <FormLabel className="text-bold">Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="w-full relative -top-2 bg-white text-black"
                      />
                    </FormControl>
                    <FormMessage className="absolute bottom-[10px] left-1 text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone_number"
                render={({ field }) => (
                  <FormItem className="relative">
                    <FormLabel className="text-bold">Phone Number</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="tel"
                        className="w-full relative -top-2 bg-white text-black"
                      />
                    </FormControl>
                    <FormMessage className="absolute bottom-[10px] left-1 text-xs" />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormLabel className="text-bold">Message</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      className="resize-none relative -top-2 h-full bg-white text-black"
                    />
                  </FormControl>
                  <FormMessage className="absolute bottom-[10px] left-1 text-xs" />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="relative rounded-full w-full mt-5 z-10"
            >
              {!sending ? "Submit" : "Please Wait..."}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
