/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import type { ClassValue } from "clsx";
import { setCookie } from "cookies-next";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const handleStorecookies = (
  accessToken: string,
  refreshToken: string,
) => {
  setCookie("access_token", accessToken, {
    maxAge: 24 * 60 * 60 * 1000,
  });
  setCookie("refresh_token", refreshToken, {
    maxAge: 6 * 24 * 60 * 60 * 1000,
  });
  localStorage.setItem("access_token", accessToken);
  localStorage.setItem("refresh_token", refreshToken);
};
