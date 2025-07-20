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
import getOTP from "@hooks/getOTP";
import { Eye, EyeOff } from "lucide-react";
import { useState, useEffect } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@components/ui/input-otp";
import { toast } from "sonner";
import Link from "next/link";
import BirthdateField from "@components/customer/signUp/brithdate-field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";
import { securityQuestions } from "@lib/utils";

export default function SignUpPage() {
  const form = useForm<SignUp>({
    resolver: zodResolver(SignUpModel),
  });
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [otp, setOtp] = useState<string>("");
  const [timer, setTimer] = useState(180);
  useEffect(() => {
    if (showConfirmation && timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
    if (showConfirmation && timer <= 0) {
      setTimer(180);
      setShowConfirmation(false);
      setOtp("");
    }
  }, [showConfirmation, timer]);

  return (
    <main className="w-full flex flex-col items-center justify-center h-dvh">
      <Branding />
      {registered ? (
        <div className="w-4/5 max-w-[500px] flex flex-col gap-2 text-justify">
          <p>
            Hi <span className="text-gold">{form.watch("first_name")}</span>,
          </p>
          <p>
            Thank you for joining But First Coffee - San Francisco Branch! We
            {"'"}re thrilled to have you as part of our coffee-loving community.
          </p>

          <p>
            As a new member, you can start earning points with every cup of
            coffee you enjoy.{" "}
            <Link href="/sign-in" className="text-gold underline">
              Be sure to log in here
            </Link>{" "}
            to track your points, manage your orders, and access special offers
            just for you.
          </p>
          <p>
            If you have any questions or need assistance, our friendly baristas
            are here to help! Come visit us at{" "}
            <Link
              href="https://maps.app.goo.gl/65fN5BdRiW7jBr7GA"
              className="text-gold"
            >
              RJ Titus bldg, Lot 2098-A Halang Rd, Brgy, Biñan, 4024 Laguna.
            </Link>
          </p>
          <p>
            Welcome aboard, and we look forward to serving you your next great
            coffee!
          </p>
          <div className="text-italic text-gold">
            <p>Warm regards,</p>
            <p>The BFC-SFB Team</p>
          </div>
        </div>
      ) : (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((values) => {
              if (values.password.length < 12) {
                return toast.error(
                  "Password must be at least 12 characters long."
                );
              }

              if (values.password === values.password.toLowerCase()) {
                return toast.error(
                  "Password must contain at least one uppercase letter."
                );
              }

              if (values.password === values.password.toUpperCase()) {
                return toast.error(
                  "Password must contain at least one lowercase letter."
                );
              }

              if (!/[!@#$%^&*(),.?":{}|<>]/.test(values.password)) {
                return toast.error(
                  "Password must contain at least one special character."
                );
              }

              if (!/\d/.test(values.password)) {
                return toast.error(
                  "Password must contain at least one number."
                );
              }

              if (!form.watch("birthday"))
                return toast.error("Please Enter your Birthdate.");

              if (!form.watch("security_question_num"))
                return toast.error("Please select a security question.");

              if (!showConfirmation) {
                getOTP(values.email, values.first_name, setShowConfirmation);
              } else {
                if (otp.length !== 6) {
                  toast.error("Invalid OTP.");
                } else {
                  addCustomer(values, otp, setRegistered);
                }
              }
            })}
            className="space-y-3"
          >
            {showConfirmation ? (
              <div className="mb-4 w-[250px] text-justify text-xs">
                <div className="space-y-2">
                  <InputOTP
                    maxLength={6}
                    value={otp}
                    onChange={(value) => setOtp(value)}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                  <div className="text-center text-sm">
                    <p>
                      Enter your one-time password (OTP) sent to your email.
                    </p>
                  </div>
                  <div className="text-center text-italic tracking-wider">
                    <p>OTP will expire in {timer} seconds.</p>
                  </div>
                </div>
              </div>
            ) : (
              <>
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
                <BirthdateField form={form} />
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
                <FormField
                  control={form.control}
                  name="security_question_num"
                  render={({ field }) => (
                    <FormItem>
                      <Select onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger className="w-[250px]">
                            <SelectValue
                              placeholder="Security Question"
                              defaultValue={field.value}
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {securityQuestions.map((question, index) => (
                            <SelectItem key={index} value={index.toString()}>
                              {question}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="security_question_answer"
                  render={({ field }) => (
                    <FormItem>
                      <div className="relative">
                        <FormControl>
                          <Input
                            placeholder="Security Question Answer"
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
              </>
            )}
            <Button variant="secondary" type="submit" className="w-full">
              {!showConfirmation ? "Sign Up" : "Verify OTP"}
            </Button>
          </form>
        </Form>
      )}
    </main>
  );
}
