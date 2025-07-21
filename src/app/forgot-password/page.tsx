"use client";

import Branding from "@components/branding";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { User } from "lucide-react";
import { checkUserIfExists } from "@/src/hooks/forgetPassword";
import { useState } from "react";

export default function ForgotPasswordPage() {
  const form = useForm({
    resolver: zodResolver(
      z.object({
        email: z.string().email("Invalid email address"),
      })
    ),
  });
  const form2 = useForm({
    resolver: zodResolver(
      z.object({
        answer: z.string().min(1, "Answer is required"),
        newPassword: z
          .string()
          .min(8, "Minimum of 8 characters")
          .max(50, "Maximum of 50 characters"),
      })
    ),
  });

  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [question, setQuestion] = useState<string | null>(null);

  return (
    <main className="transition-all duration-500 flex flex-col items-center justify-center h-dvh gap-10">
      <Branding />
      {question == null ? (
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(async (values) => {
                setUserEmail(values.email);
                checkUserIfExists(values.email, setQuestion);
              })}
              className="space-y-3 w-full max-w-[280px] px-2"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <div className="relative">
                      <FormLabel className="absolute top-2 left-2">
                        <User />
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your email"
                          {...field}
                          className="w-full pl-10 h-10"
                        />
                      </FormControl>
                    </div>
                    <div className="relative flex justify-end pr-2">
                      <FormMessage className="absolute top-[-10px]" />
                    </div>
                  </FormItem>
                )}
              />
              <Button variant="secondary" type="submit" className="w-full">
                Recover Password
              </Button>
            </form>
          </Form>
        </div>
      ) : (
        <div className="text-center space-y-4">
          <p>Please answer the security question:</p>
          <div className="space-y-2">
            <p className="italic">{question}</p>
            <Form {...form2}>
              <form
                onSubmit={form2.handleSubmit((values) => {
                  console.log(values);
                })}
                className="space-y-3 w-full max-w-[280px] px-2"
              >
                <FormField
                  control={form2.control}
                  name="answer"
                  render={({ field }) => (
                    <FormItem>
                      <div className="relative">
                        <FormControl>
                          <Input
                            placeholder="Answer here..."
                            {...field}
                            className="w-full h-10"
                          />
                        </FormControl>
                      </div>
                      <div className="relative flex justify-end pr-2">
                        <FormMessage className="absolute top-[-10px]" />
                      </div>
                    </FormItem>
                  )}
                />
                <Button variant="secondary" type="submit" className="w-full">
                  Submit
                </Button>
              </form>
            </Form>
          </div>
        </div>
      )}
    </main>
  );
}
