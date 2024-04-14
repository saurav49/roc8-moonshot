import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";
import { isLoggedIn } from "~/server/middleware/user";
export const PAGE_SIZE = 6;
export const categoryRouter = createTRPCRouter({
  getAllCategory: publicProcedure
    .input(
      z.object({
        pageNumber: z.number(),
      }),
    )
    .use(isLoggedIn)
    .query(async ({ ctx, input }) => {
      const categories = await ctx.db.category.findMany({
        skip: (input.pageNumber - 1) * PAGE_SIZE,
        take: PAGE_SIZE,
      });
      const totalCategory = await ctx.db.category.count();
      console.log({
        totalCategory,
        size: Math.ceil(totalCategory / PAGE_SIZE),
      });
      return {
        success: true,
        data: {
          categories,
          totalPages: Math.ceil(totalCategory / PAGE_SIZE),
          currentPage: input.pageNumber,
        },
      };
    }),
});
