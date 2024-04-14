/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
"use client";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { ClassValue } from "clsx";
import { getCookie, setCookie } from "cookies-next";
export const destroyCookieOption = {
  path: "/",
};
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const handleStoreCookie = ({
  cookieValue,
  cookieKey,
}: {
  cookieValue: string;
  cookieKey: string;
}) => {
  setCookie(cookieKey, cookieValue, {
    maxAge: 24 * 60 * 60,
    path: "/",
  });
};
export const getAccessTokenFromLocalStorage = () => {
  return localStorage.getItem("access_token");
};
export const getRefreshTokenFromLocalStorage = () => {
  return localStorage.getItem("refresh_token");
};
export const getAccessTokenFromCookies = () => {
  const accessToken = getCookie("accessToken");
  return accessToken;
};
export const deleteAccessTokenLocalStorage = () => {
  return localStorage.removeItem("access_token");
};
export const deleteRefreshTokenLocalStorage = () => {
  return localStorage.removeItem("refresh_token");
};
