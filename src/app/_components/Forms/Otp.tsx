"use client";
import React from "react";
import { OTPInput, type SlotProps } from "input-otp";
import { cn } from "~/lib/utils";

function Otp({ message, email }: { message: string; email: string }) {
  return (
    <div className="flex h-[691px] w-full max-w-[576px] flex-col items-center rounded-md border border-gray px-[60px] py-10">
      <h1 className="mb-8 text-3xl font-semibold">Verify your email</h1>
      <div className="flex flex-col items-center">
        <span className="text-base font-normal">{message}</span>
        <span className="text-base font-semibold text-black">{email}</span>
      </div>
      <form className="mt-[46px] flex flex-col items-center">
        <OTPInput
          maxLength={8}
          containerClassName="group flex items-center has-[:disabled]:opacity-30"
          render={({ slots }) => (
            <>
              <div className="flex">
                {slots.slice(0).map((slot, idx) => (
                  <Slot key={idx} {...slot} />
                ))}
              </div>
            </>
          )}
        />
        <button
          type="submit"
          className="mt-16 rounded-md border border-black bg-black px-[147px] py-[18.5px] text-center font-inter text-base font-medium uppercase text-white"
        >
          {false ? <span>Loading...</span> : <span>verify</span>}
        </button>
      </form>
    </div>
  );
}

export { Otp };

export function Slot(props: SlotProps) {
  return (
    <div
      className={cn(
        "relative mx-1 h-12 w-[46px] text-[2rem]",
        "flex items-center justify-center",
        "transition-all duration-300",
        "rounded-md border border-gray",
        "group-hover:border-accent-foreground/20 group-focus-within:border-accent-foreground/20",
        "outline-accent-foreground/20 outline outline-0",
        { "outline-accent-foreground outline-4": props.isActive },
      )}
    >
      {props.char !== null && <div>{props.char}</div>}
    </div>
  );
}
