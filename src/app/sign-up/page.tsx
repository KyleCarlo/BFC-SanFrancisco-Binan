"use client";

import Branding from "@components/branding";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@components/ui/form";
import { Input } from "@components/ui/input";
import { Button } from "@components/ui/button";
import { SignUp, SignUpModel } from "@models/User";
import { zodResolver } from "@hookform/resolvers/zod";
import addCustomer from "@hooks/addCustomer";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export default function SignUpPage() {
  const form = useForm<SignUp>({
    resolver: zodResolver(SignUpModel),
  });
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  return (
    <main className="w-full flex flex-col items-center justify-center h-dvh">
      <Branding />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((values) => {
            addCustomer(values, router);
          })}
          className="space-y-3"
        >
          <div className="flex gap-2 justify-around w-[250px]">
            <FormField
              control={form.control}
              name="first_name"
              render={({ field }) => (
                <FormItem>
                  <div className="relative">
                    <FormControl>
                      <Input
                        placeholder="First Name"
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
            <FormField
              control={form.control}
              name="last_name"
              render={({ field }) => (
                <FormItem>
                  <div className="relative">
                    <FormControl>
                      <Input
                        placeholder="Last Name"
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
          </div>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <div className="relative">
                  <FormControl>
                    <Input
                      placeholder="Email"
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
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="relative">
                  <FormControl>
                    <>
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        {...field}
                        className="w-full pr-10 h-10"
                      />
                      {showPassword ? (
                        <EyeOff
                          className="absolute right-2 bottom-2 hover:cursor-pointer"
                          onClick={() => {
                            setShowPassword(false);
                          }}
                        />
                      ) : (
                        <Eye
                          className="absolute right-2 bottom-2 hover:cursor-pointer"
                          onClick={() => {
                            setShowPassword(true);
                          }}
                        />
                      )}
                    </>
                  </FormControl>
                </div>
                <div className="relative flex justify-end pr-2">
                  <FormMessage className="absolute top-[-10px]" />
                </div>
              </FormItem>
            )}
          />
          <Button variant="secondary" type="submit" className="w-full">
            Sign Up
          </Button>
        </form>
      </Form>
    </main>
  );
}
