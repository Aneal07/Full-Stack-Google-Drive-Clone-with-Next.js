"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import  Link  from "next/link";
import { useState } from "react";


type FormType = "sign-in" | "sign-up";

const authFormSchema = (formType: FormType) => {
  return z.object({
    email: z.string().email(),
    fullName:
      formType === "sign-up"
        ? z.string().min(2).max(50)
        : z.string().optional(),
  });
};

const AuthForm = ({ type }: { type: FormType }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const formSchema = authFormSchema(type)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "", email: " ",
    },
  });

  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };
  return (
    <>
      <div>
        {" "}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="auth-form">
            <h1 className="form-title">
              {type === "sign-in" ? "sign In" : "Sign Up"}
            </h1>
            {type === "sign-up" && (
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <div className="shad-form-item">
                      <FormLabel className="shad-form-label">
                        Full Name
                      </FormLabel>
                    </div>

                    <FormControl>
                      <Input
                        placeholder="Enter your full name"
                        className="shad-input"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage className="shad-form-message" />
                  </FormItem>
                )}
              />
            )}
            <FormField
              control={form.control}
              name="Email"
              render={({ field }) => (
                <FormItem>
                  <div className="shad-form-item">
                    <FormLabel className="shad-form-label">Email</FormLabel>
                  </div>

                  <FormControl>
                    <Input
                      placeholder="Enter your email id"
                      className="shad-input"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage className="shad-form-message" />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="form-submit-button"
              disabled={isLoading}
            >
              {type === "sign-in" ? "sign In" : "Sign Up"}

              {isLoading && (
                <Image
                  src="/assets/icons/loader.svg"
                  alt="loader"
                  width={24}
                  height={24}
                  className="ml-2 animate-spin"
                />
              )}
            </Button>
            {errorMessage && <p className="error-message">*{errorMessage}</p>}
            <div className="body-2 flex justify-center">
              <p className="text-light-100">
                {type === "sign-in"
                  ? "Don't have an account?"
                  : "Already have an account?"}
              </p>
              <Link
                href={type === "sign-in" ? "/sign-up" : "/sign-in"}
                className="ml-1 font-meduim text-brand"
              >
                {" "}
                {type === "sign-in" ? "sign Up" : "Sign In"}
              </Link>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
};

export default AuthForm;
