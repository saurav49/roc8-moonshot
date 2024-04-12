import { decodeAndVerifyJwtToken } from "~/lib/utils";
import type * as trpcNext from "@trpc/server/adapters/next";
import { db } from "~/server/db";
export async function createContext({
  headers,
  ctx,
}: {
  headers: Headers;
  ctx: trpcNext.CreateNextContextOptions;
}) {
  async function getUserFromHeader() {
    if (ctx.req.headers.authorization) {
      const token = ctx.req.headers.authorization.split(" ")[1];
      if (!token) {
        return null;
      }
      const user = await decodeAndVerifyJwtToken(token);
      if (!user) {
        return null;
      }
      console.log(user);
      return user;
    }
    return null;
  }
  const user = await getUserFromHeader();

  return {
    db,
    headers,
    user,
  };
}
export type Context = Awaited<ReturnType<typeof createContext>>;
