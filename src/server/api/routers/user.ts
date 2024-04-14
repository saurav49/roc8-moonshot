import { z } from "zod";
import {
  addCategorySchema,
  loginFormSchema,
  signupFormSchema,
} from "~/lib/schema";
import * as bcrypt from "bcrypt";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { sendEmail } from "~/app/_actions";
import jwt from "jsonwebtoken";
import { isLoggedIn } from "~/server/middleware/user";
import { TRPCError } from "@trpc/server";

export type JwtPayload = {
  email: string;
};
export const generateAccessToken = (payload: JwtPayload) => {
  const token = jwt.sign(payload, process.env.JWT_ACCESS_KEY ?? "", {
    expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN,
  });
  return token;
};

export const userRouter = createTRPCRouter({
  signup: publicProcedure
    .input(signupFormSchema)
    .mutation(async ({ ctx, input }) => {
      const generateOtp = (length: number) => {
        let otp = "";
        for (let i = 0; i < length; i++) {
          otp += Math.floor(Math.random() * 10);
        }
        return otp;
      };
      const ogOtp = generateOtp(8);
      let otp = ogOtp;
      const salt = await bcrypt.genSalt();
      otp = await bcrypt.hash(otp.toString(), salt);
      let password = input.password;
      password = await bcrypt.hash(password, salt);
      const r = await ctx.db.user.create({
        data: {
          name: input.name,
          email: input.email,
          password: password,
          otp: otp,
          isVerify: false,
        },
      });
      if (r.id) {
        await sendEmail({ name: input.name, email: input.email, otp: ogOtp });
        return {
          success: true,
          data: r,
        };
      }
    }),
  verify: publicProcedure
    .input(
      z.object({
        otp: z.string().min(1),
        email: z.string().email(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const otp = input.otp;
      const email = input.email;
      const user = await ctx.db.user.findUnique({
        where: {
          email,
        },
      });
      if (!user) {
        throw new Error("User not found");
      }
      if (!user.otp) {
        throw new Error("User otp not found");
      }
      const userOtp = user.otp;
      const isMatch = await bcrypt.compare(otp, userOtp);
      if (!isMatch) {
        throw new Error("Invalid otp");
      }
      const accessToken = generateAccessToken({ email: user.email });
      await ctx.db.user.update({
        where: {
          email: email,
        },
        data: {
          isVerify: true,
          otp: null,
        },
      });
      return {
        success: true,
        data: {
          accessToken,
        },
      };
    }),
  login: publicProcedure
    .input(loginFormSchema)
    .mutation(async ({ ctx, input }) => {
      const email = input.email;
      const user = await ctx.db.user.findUnique({
        where: {
          email,
        },
        include: {
          categories: true,
        },
      });
      if (!user) {
        throw new Error("User not found");
      }
      if (!user.isVerify) {
        throw new Error("User not verified");
      }
      const password = user.password;
      const isMatch = await bcrypt.compare(input.password, password);
      if (!isMatch) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Invalid password",
        });
      }
      const accessToken = generateAccessToken({ email: user.email });
      return {
        success: true,
        data: {
          ...user,
          accessToken,
        },
      };
    }),
  getLikedCategoriesByEmail: publicProcedure
    .use(isLoggedIn)
    .query(async ({ ctx }) => {
      if (!ctx.user || ctx.user.email.trim().length === 0) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
        });
      }
      const email = ctx.user.email;
      const user = await ctx.db.user.findUnique({
        where: {
          email,
        },
        include: {
          categories: true,
        },
      });
      if (!user) {
        throw new Error("User not found");
      }
      return {
        success: true,
        data: user.categories,
      };
    }),
  delete: publicProcedure.mutation(async ({ ctx }) => {
    await ctx.db.user.delete({
      where: {
        email: ctx.user?.email,
      },
    });
  }),
  likeCategory: publicProcedure
    .input(addCategorySchema)
    .use(isLoggedIn)
    .mutation(async ({ ctx, input }) => {
      if (!ctx.user || ctx.user.email.trim().length === 0) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
        });
      }
      const user = await ctx.db.user.findUnique({
        where: {
          email: ctx.user.email,
        },
      });
      const category = await ctx.db.category.findUnique({
        where: {
          id: input.category.id,
        },
      });
      if (!user) {
        throw new Error("User not found");
      }
      if (!user.isVerify) {
        throw new Error("User not verified");
      }
      if (!category) {
        throw new Error("Category not found");
      }
      return await ctx.db.user.update({
        where: {
          email: ctx.user.email,
        },
        data: {
          categories: {
            connect: {
              id: input.category.id,
            },
          },
        },
      });
    }),
  unlikeCategory: publicProcedure
    .input(addCategorySchema)
    .use(isLoggedIn)
    .mutation(async ({ ctx, input }) => {
      if (!ctx.user || ctx.user.email.trim().length === 0) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
        });
      }
      const user = await ctx.db.user.findUnique({
        where: {
          email: ctx.user.email,
        },
      });
      const category = await ctx.db.category.findUnique({
        where: {
          id: input.category.id,
        },
      });
      if (!user) {
        throw new Error("User not found");
      }
      if (!user.isVerify) {
        throw new Error("User not verified");
      }
      if (!category) {
        throw new Error("Category not found");
      }
      return await ctx.db.user.update({
        where: {
          email: ctx.user.email,
        },
        data: {
          categories: {
            disconnect: {
              id: input.category.id,
            },
          },
        },
      });
    }),
  me: publicProcedure
    .use(isLoggedIn)
    .output(
      z.object({
        email: z.string().email(),
      }),
    )
    .query(async ({ ctx }) => {
      if (!ctx.user || ctx.user.email.trim().length === 0) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
        });
      }
      const user = await ctx.db.user.findUnique({
        where: {
          email: ctx.user.email,
        },
      });
      if (!user) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }
      return {
        success: true,
        email: user.email,
        name: user.name,
      };
    }),
});
