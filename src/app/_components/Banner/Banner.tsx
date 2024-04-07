import React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "..";

function Banner({ msg }: { msg: string }) {
  return (
    <div className="flex w-screen items-center justify-center bg-zinc-200 py-[10px]">
      <button className="cursor-pointer">
        <ChevronLeftIcon className="h-4 w-4" />
      </button>
      <p className="mx-6 text-sm font-medium text-black">{msg}</p>
      <button className="cursor-pointer">
        <ChevronRightIcon className="h-4 w-4" />
      </button>
    </div>
  );
}

export { Banner };
