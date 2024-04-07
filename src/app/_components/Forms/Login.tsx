"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { loginFormSchema } from "~/lib/schema";
import { type z } from "zod";
export type LoginFormFields = z.infer<typeof loginFormSchema>;

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormFields>({
    resolver: zodResolver(loginFormSchema),
  });
  const onFormSubmit: SubmitHandler<LoginFormFields> = (data) => {
    console.log(data);
  };
  const [isShowPass, setIsShowPass] = React.useState<boolean>(false);
  return (
    <div className="flex h-[691px] w-full max-w-[576px] flex-col items-center rounded-md border border-gray px-[60px] py-10">
      <h1 className="mb-8  text-3xl font-semibold text-black">Login</h1>
      <h2 className=" text-2xl font-medium text-black">
        Welcome back to ECOMMERCE
      </h2>
      <p className="mb-[31px] mt-[13px]  text-base font-normal text-black">
        The next gen business marketplace
      </p>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        {/* Email */}
        <div className="my-8 flex w-full flex-col items-start gap-[7px]">
          <label htmlFor="email" className=" text-base font-normal text-black">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter email"
            className="placeholder: w-full rounded-md border border-gray p-4"
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
            className=" text-base font-normal text-black"
          >
            Password
          </label>
          <input
            type={isShowPass ? "text" : "password"}
            id="password"
            placeholder="Enter password"
            className="placeholder: w-full rounded-md border border-gray p-4"
            {...register("password")}
          />
          <button
            className="text-base font-normal text-black underline underline-offset-4"
            onClick={() => setIsShowPass((prevState) => !prevState)}
          >
            Show
          </button>
          {errors.password && (
            <small className="text-center text-base font-normal text-error">
              {errors.password.message}
            </small>
          )}
        </div>
        <button
          type="submit"
          className="mt-10 rounded-md border border-black bg-black px-[147px] py-[18.5px] text-center text-base font-medium uppercase text-white"
        >
          {isSubmitting ? <span>Loading...</span> : <span>Create account</span>}
        </button>
      </form>
      <div className="mb-[31px] mt-[29px] h-1 w-full bg-gray"></div>
      <div className="flex items-center text-base">
        <p className="mr-[11px]  font-normal text-darkcharcoal">
          Don&apos;t have an Account ?
        </p>
        <button
          type="button"
          className="cursor-pointer  font-medium uppercase text-black"
        >
          sign up
        </button>
      </div>
    </div>
  );
}

export { Login };
