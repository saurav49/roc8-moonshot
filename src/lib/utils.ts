/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
"use client";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { ClassValue } from "clsx";
import { getCookie, setCookie } from "cookies-next";
export const destroyCookieOption = {
  path: "/",
  // domain: "localhost",
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
  // if (cookieKey === "refreshToken") {
  //   // setCookie(null, cookieKey, cookieValue, {
  //   //   path: "/",
  //   //   maxAge: 2 * 60,
  //   // });
  //   setCookie(cookieKey, cookieValue, {
  //     // maxAge: 6 * 24 * 60 * 60 * 1000,
  //     maxAge: 60,
  //     path: "/",
  //     // domain: "localhost",
  //   });
  //   return;
  // }
  // setCookie(null, cookieKey, cookieValue, {
  //   path: "/",
  //   maxAge: 60,
  // });
  setCookie(cookieKey, cookieValue, {
    // maxAge: 24 * 60 * 60 * 1000,
    maxAge: 60,
    path: "/",
    // domain: "localhost",
  });
};
export const getAccessTokenFromLocalStorage = () => {
  return localStorage.getItem("access_token");
};
export const getRefreshTokenFromLocalStorage = () => {
  return localStorage.getItem("refresh_token");
};
export const getAccessTokenFromCookies = () => {
  // const { accessToken } = parseCookies();
  const accessToken = getCookie("accessToken");
  return accessToken;
};
// export const getRefreshTokenFromCookies = () => {
//   const { refreshToken } = parseCookies();
//   return refreshToken;
// };
// export const deleteAccessTokenCookie = () => {
//   return destroyCookie({}, "access_token", destroyCookieOption);
// };
export const deleteAccessTokenLocalStorage = () => {
  return localStorage.removeItem("access_token");
};
export const deleteRefreshTokenLocalStorage = () => {
  return localStorage.removeItem("refresh_token");
};
