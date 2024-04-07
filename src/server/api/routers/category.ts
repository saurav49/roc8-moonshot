import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";
export const PAGE_SIZE = 5;
export const categoryRouter = createTRPCRouter({
  getAllCategory: publicProcedure
    .input(
      z.object({
        pageNumber: z.number(),
      }),
    )
    .query(({ ctx, input }) => {
      return ctx.db.category.findMany({
        skip: (input.pageNumber - 1) * PAGE_SIZE,
        take: PAGE_SIZE,
      });
    }),
  getTotalPages: publicProcedure.query(({ ctx }) => {
    return ctx.db.category.count();
  }),
});
