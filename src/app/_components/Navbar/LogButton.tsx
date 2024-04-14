"use client";
import { deleteCookie } from "cookies-next";
import React from "react";
import { destroyCookieOption } from "~/lib/utils";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
export const LogButton = ({ btnText }: { btnText: string }) => {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <>
      {pathname.includes("/") ? (
        <button
          onClick={() => {
            deleteCookie("accessToken", destroyCookieOption);
            deleteCookie("email", destroyCookieOption);
            router.push("/login");
          }}
          className="mb-[0.35rem] cursor-pointer text-xs font-normal text-black"
          type="button"
        >
          Log out
        </button>
      ) : (
        <span>{btnText}</span>
      )}
    </>
  );
};
