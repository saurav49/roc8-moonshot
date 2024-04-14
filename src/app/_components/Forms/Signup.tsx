"use client";
import React from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupFormSchema } from "~/lib/schema";
import { type z } from "zod";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";

export type SingupFormFields = z.infer<typeof signupFormSchema>;
function Signup() {
  const [isShowPass, setIsShowPass] = React.useState<boolean>(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SingupFormFields>({
    resolver: zodResolver(signupFormSchema),
  });
  const { mutate, isSuccess, data, isPending } = api.user.signup.useMutation();
  const onFormSubmit: SubmitHandler<SingupFormFields> = (data) => {
    mutate(data);
  };
  React.useEffect(() => {
    if (isSuccess && data?.success) {
      router.push(`/otp?email=${data.data.email}`);
    }
  }, [data, isSuccess, router]);
  return (
    <div className="flex w-full max-w-[576px] flex-col items-center rounded-md border border-gray px-[60px] py-10">
      <h1 className="mb-8  text-3xl font-semibold">Create your account</h1>
      <form
        onSubmit={handleSubmit(onFormSubmit)}
        className="mb-12 flex w-full flex-col items-center"
      >
        {/* Name */}
        <div className="flex w-full flex-col items-start gap-[7px]">
          <label htmlFor="name" className=" text-base font-normal text-black">
            Name
          </label>
          <input
            type="text"
            id="name"
            placeholder="Enter name"
            className="placeholder: w-full rounded-md border border-gray p-4"
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
        <div className="relative flex w-full flex-col items-start gap-[7px]">
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
            className="absolute right-4 top-[46px] text-base font-normal text-black underline underline-offset-4"
            onClick={() => setIsShowPass((prevState) => !prevState)}
            type="button"
          >
            {isShowPass ? <span>Hide</span> : <span>Show</span>}
          </button>
          {errors.password && (
            <small className="text-center text-base font-normal text-error">
              {errors.password.message}
            </small>
          )}
        </div>
        <button
          type="submit"
          className="mt-10 w-full rounded-md border border-black bg-black px-[147px] py-[18.5px] text-center  text-base font-medium uppercase text-white"
        >
          {isSubmitting || isPending ? (
            <span>Loading...</span>
          ) : (
            <span>Create account</span>
          )}
        </button>
      </form>
      <div className="flex items-center text-base">
        <p className="mr-[11px]  font-normal text-darkcharcoal">
          Have and account?
        </p>
        <button
          type="button"
          className="cursor-pointer  font-medium uppercase text-black"
          onClick={() => router.push("/login")}
        >
          Login
        </button>
      </div>
    </div>
  );
}

export { Signup };
