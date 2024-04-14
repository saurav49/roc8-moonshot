import { TRPCError } from "@trpc/server";
import { middleware } from "../api/trpc";
export const isLoggedIn = middleware(async (opts) => {
  const { ctx } = opts;
  if (!ctx.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  const user = await ctx.db.user.findUnique({
    where: {
      email: ctx.user.email,
    },
  });
  return opts.next({
    ctx: {
      user,
    },
  });
});
