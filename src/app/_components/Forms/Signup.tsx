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
      <h1 className="mb-8 text-3xl font-semibold">Create your account</h1>
      <form onSubmit={handleSubmit(onFormSubmit)} className="mb-12">
        {/* Name */}
        <div className="flex flex-col items-start gap-[7px]">
          <label htmlFor="name" className="text-base font-normal">
            Name
          </label>
          <input
            type="text"
            id="name"
            placeholder="Enter name"
            className="border-gray rounded-md border p-4"
            {...register("name")}
          />
          {errors.name && (
            <small className="text-error text-center text-base font-normal">
              {errors.name.message}
            </small>
          )}
        </div>
        {/* Email */}
        <div className="my-8 flex flex-col items-start gap-[7px]">
          <label htmlFor="email" className="text-base font-normal">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter email"
            className="border-gray rounded-md border p-4"
            {...register("email")}
          />
          {errors.email && (
            <small className="text-error text-center text-base font-normal">
              {errors.email.message}
            </small>
          )}
        </div>
        {/* Password */}
        <div className="flex flex-col items-start gap-[7px]">
          <label htmlFor="password" className="text-base font-normal">
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Enter password"
            className="border-gray rounded-md border p-4"
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
          className="mt-10 rounded-md border border-black bg-black px-[147px] py-[18.5px] text-center text-base font-medium text-white"
        >
          {isSubmitting ? <span>Loading...</span> : <span>Create account</span>}
        </button>
      </form>
      <div className="flex items-center text-base">
        <p className="mr-[11px] font-normal">Have and account?</p>
        <button type="button" className="font-medium">
          Login
        </button>
      </div>
    </div>
  );
}

export { Signup };
