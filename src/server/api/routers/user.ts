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

export type JwtPayload = {
  email: string;
};
const generateAccessToken = (payload: JwtPayload) => {
  const token = jwt.sign(payload, process.env.JWT_ACCESS_KEY ?? "", {
    expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN,
  });
  return token;
};
const generateRefreshToken = (payload: JwtPayload) => {
  const token = jwt.sign(payload, process.env.JWT_REFRESH_KEY ?? "", {
    expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN ?? "7d",
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
      const refreshToken = generateRefreshToken({ email: user.email });
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
          refreshToken,
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
        throw new Error("Invalid password");
      }
      const accessToken = generateAccessToken({ email: user.email });
      const refreshToken = generateRefreshToken({ email: user.email });
      return {
        success: true,
        data: {
          ...user,
          accessToken,
          refreshToken,
        },
      };
    }),
  getLikedCategoriesByEmail: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const email = input.email;
      console.log(email, input);
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
        email: "biswassaurav71@gmail.com",
      },
    });
  }),
  likeCategory: publicProcedure
    .input(addCategorySchema)
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.db.user.findUnique({
        where: {
          email: input.email,
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
          email: input.email,
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
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.db.user.findUnique({
        where: {
          email: input.email,
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
          email: input.email,
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
});
