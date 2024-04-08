import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";
import { PAGE_SIZE } from "~/lib/utils";

export const categoryRouter = createTRPCRouter({
  getAllCategory: publicProcedure
    .input(
      z.object({
        pageNumber: z.number(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const categories = await ctx.db.category.findMany({
        skip: (input.pageNumber - 1) * PAGE_SIZE,
        take: PAGE_SIZE,
      });
      const totalPages = await ctx.db.category.count();
      return {
        success: true,
        data: {
          categories,
          totalPages,
          currentPage: input.pageNumber,
        },
      };
    }),
});
