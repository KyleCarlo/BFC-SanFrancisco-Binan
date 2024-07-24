"use client";

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
import { Login, LoginModel } from "@models/User";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "lucide-react";
import { RectangleEllipsis } from "lucide-react";
import { login } from "@lib/auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Eye } from "lucide-react";
import { EyeOff } from "lucide-react";
import { useState } from "react";

export default function SignInForm({ role }: { role: "staff" | "customer" }) {
  const form = useForm<Login>({
    resolver: zodResolver(LoginModel),
  });
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(async (values) => {
          const { proceed, message } = await login(role, values);
          if (proceed) {
            if (role === "staff") router.refresh();
            if (role === "customer") {
              router.push("/order");
            }
          } else {
            toast.error(message);
          }
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
                    placeholder="Email"
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
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <div className="relative">
                <FormLabel className="absolute top-2 left-2">
                  <RectangleEllipsis />
                </FormLabel>
                <FormControl>
                  <>
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      {...field}
                      className="w-full px-10 h-10"
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
          Sign In
        </Button>
      </form>
    </Form>
  );
}
