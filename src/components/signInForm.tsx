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
import { useRouter } from "next/navigation";

export default function SignInForm({ role }: { role: "staff" | "customer" }) {
  const form = useForm<Login>({
    resolver: zodResolver(LoginModel),
  });
  const router = useRouter();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(async (values) => {})}
        className="space-y-3 w-full max-w-[280px]"
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
                  <Input
                    placeholder="Password"
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
        <Button variant="outline" type="submit" className="w-full">
          Sign In
        </Button>
      </form>
    </Form>
  );
}
