/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
"use client";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import jwt from "jsonwebtoken";
import type { ClassValue } from "clsx";
import { getCookie, setCookie } from "cookies-next";

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
export const decodeAndVerifyJwtToken = (
  token: string,
): Promise<{ email: string }> => {
  return new Promise((resolve) => {
    jwt.verify(token, process.env.JWT_ACCESS_KEY ?? "", (_, user) => {
      if (user) {
        resolve(user as { email: string });
      }
    });
  });
};
export const getAccessTokenFromLocalStorage = () => {
  return localStorage.getItem("access_token");
};
export const getRefreshTokenFromLocalStorage = () => {
  return localStorage.getItem("refresh_token");
};
export const getAccessTokenFromCookies = () => {
  return getCookie("access_token");
};
export const saveAccessTokenToCookies = (accessToken: string) => {
  setCookie("access_token", accessToken, {
    maxAge: 24 * 60 * 60 * 1000,
  });
};
export const saveRefreshTokenToCookies = (refreshToken: string) => {
  setCookie("refresh_token", refreshToken, {
    maxAge: 6 * 24 * 60 * 60 * 1000,
  });
};
export const getRefreshTokenFromCookies = () => {
  return getCookie("refresh_token");
};
