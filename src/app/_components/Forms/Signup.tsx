"use client";
import React from "react";
import { z } from "zod";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
const signupFormSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(4).max(20),
});
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
    <div className="border-gray flex h-[691px] w-full max-w-[576px] flex-col items-center rounded-md border px-[60px] py-10">
      <h1 className="font-inter mb-8 text-3xl font-semibold">
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
            className="border-gray placeholder:font-inter w-full rounded-md border p-4"
            {...register("name")}
          />
          {errors.name && (
            <small className="text-error text-center text-base font-normal">
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
            className="border-gray placeholder:font-inter w-full rounded-md border p-4"
            {...register("email")}
          />
          {errors.email && (
            <small className="text-error text-center text-base font-normal">
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
            className="border-gray placeholder:font-inter w-full rounded-md border p-4"
            {...register("password")}
          />
          {errors.password && (
            <small className="text-error text-center text-base font-normal">
              {errors.password.message}
            </small>
          )}
        </div>
        <button
          type="submit"
          className="font-inter mt-10 rounded-md border border-black bg-black px-[147px] py-[18.5px] text-center text-base font-medium uppercase text-white"
        >
          {isSubmitting ? <span>Loading...</span> : <span>Create account</span>}
        </button>
      </form>
      <div className="flex items-center text-base">
        <p className="text-darkcharcoal font-inter mr-[11px] font-normal">
          Have and account?
        </p>
        <button
          type="button"
          className="font-inter cursor-pointer font-medium uppercase text-black"
        >
          Login
        </button>
      </div>
    </div>
  );
}

export { Signup };
