"use client";
import React from "react";
import { OTPInput, type SlotProps } from "input-otp";
import { cn, handleStorecookies } from "~/lib/utils";
import { api } from "~/trpc/react";
import { Toaster, toast } from "sonner";
import { useRouter } from "next/navigation";

function Otp({ message, email }: { message: string; email: string }) {
  const router = useRouter();
  const [otp, setOtp] = React.useState<string>("");
  const { mutate, isSuccess, isPending, data } = api.user.verify.useMutation();
  React.useEffect(() => {
    if (isSuccess && data?.success && data.data) {
      toast("User verfied successfully");
      handleStorecookies(data.data.accessToken, data.data.refreshToken);
      setTimeout(() => {
        router.push("/category");
      }, 1000);
    }
  }, [data?.data, data?.success, isSuccess, router]);
  return (
    <div className="flex h-[453px] w-full max-w-[576px] flex-col items-center rounded-md border border-gray px-[60px] py-10">
      <Toaster closeButton />
      <h1 className="mb-8 text-3xl font-semibold">Verify your email</h1>
      <div className="flex flex-col items-center">
        <span className="text-base font-normal">{message}</span>
        <span className="text-base font-semibold text-black">{email}</span>
      </div>
      <form
        className="mt-[46px] flex flex-col items-center"
        onSubmit={(e) => {
          e.preventDefault();
          mutate({ otp, email });
        }}
      >
        <OTPInput
          value={otp}
          onChange={(value) => setOtp(value)}
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
          className="mt-16 w-full rounded-md border border-black bg-black px-[147px] py-[18.5px] text-center  text-base font-medium uppercase text-white"
        >
          {isPending ? <span>Loading...</span> : <span>verify</span>}
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
