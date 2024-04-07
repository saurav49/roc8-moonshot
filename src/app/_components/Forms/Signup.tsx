"use client";
import React from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupFormSchema } from "~/lib/schema";
import { type z } from "zod";

export type SingupFormFields = z.infer<typeof signupFormSchema>;
function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SingupFormFields>({
    resolver: zodResolver(signupFormSchema),
  });
  const onFormSubmit: SubmitHandler<SingupFormFields> = (data) => {
    console.log(data);
  };
  return (
    <div className="flex h-[691px] w-full max-w-[576px] flex-col items-center rounded-md border border-gray px-[60px] py-10">
      <h1 className="mb-8 font-inter text-3xl font-semibold">
        Create your account
      </h1>
      <form onSubmit={handleSubmit(onFormSubmit)} className="mb-12">
        {/* Name */}
        <div className="flex w-full flex-col items-start gap-[7px]">
          <label
            htmlFor="name"
            className="font-inter text-base font-normal text-black"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            placeholder="Enter name"
            className="w-full rounded-md border border-gray p-4 placeholder:font-inter"
            {...register("name")}
          />
          {errors.name && (
            <small className="text-center text-base font-normal text-error">
              {errors.name.message}
            </small>
          )}
        </div>
        {/* Email */}
        <div className="my-8 flex w-full flex-col items-start gap-[7px]">
          <label
            htmlFor="email"
            className="font-inter text-base font-normal text-black"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter email"
            className="w-full rounded-md border border-gray p-4 placeholder:font-inter"
            {...register("email")}
          />
          {errors.email && (
            <small className="text-center text-base font-normal text-error">
              {errors.email.message}
            </small>
          )}
        </div>
        {/* Password */}
        <div className="flex w-full flex-col items-start gap-[7px]">
          <label
            htmlFor="password"
            className="font-inter text-base font-normal text-black"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Enter password"
            className="w-full rounded-md border border-gray p-4 placeholder:font-inter"
            {...register("password")}
          />
          {errors.password && (
            <small className="text-center text-base font-normal text-error">
              {errors.password.message}
            </small>
          )}
        </div>
        <button
          type="submit"
          className="mt-10 rounded-md border border-black bg-black px-[147px] py-[18.5px] text-center font-inter text-base font-medium uppercase text-white"
        >
          {isSubmitting ? <span>Loading...</span> : <span>Create account</span>}
        </button>
      </form>
      <div className="flex items-center text-base">
        <p className="mr-[11px] font-inter font-normal text-darkcharcoal">
          Have and account?
        </p>
        <button
          type="button"
          className="cursor-pointer font-inter font-medium uppercase text-black"
        >
          Login
        </button>
      </div>
    </div>
  );
}

export { Signup };
