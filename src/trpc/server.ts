import "server-only";

import { headers } from "next/headers";
import { cache } from "react";
import { cookies } from "next/headers";
import { createCaller } from "~/server/api/root";
import { createTRPCContext } from "~/server/context";
import { getCookie } from "cookies-next";

/**
 * This wraps the `createTRPCContext` helper and provides the required context for the tRPC API when
 * handling a tRPC call from a React Server Component.
 */
const createContext = cache(() => {
  const accessToken = getCookie("accessToken", { cookies });
  const heads = new Headers(headers());
  heads.set("x-trpc-source", "rsc");
  if (accessToken) {
    heads.set("authorization", `Bearer ${accessToken}`);
  }
  return createTRPCContext({
    headers: heads,
  });
});

export const api = createCaller(createContext);
