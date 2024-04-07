/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { z } from "zod";
import { loginFormSchema, signupFormSchema } from "~/lib/schema";
import * as bcrypt from "bcrypt";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

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
      let otp = generateOtp(8);
      const salt = await bcrypt.genSalt();
      otp = await bcrypt.hash(otp.toString(), salt);
      let password = input.password;
      password = await bcrypt.hash(password, salt);
      return ctx.db.user.create({
        data: {
          name: input.name,
          email: input.email,
          password: password,
          otp: otp,
          isVerify: false,
        },
      });
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
      const isMatch = bcrypt.compare(otp, user.otp);
      if (!isMatch) {
        throw new Error("Invalid otp");
      }
      return ctx.db.user.update({
        where: {
          email: email,
        },
        data: {
          isVerify: true,
          otp: null,
        },
      });
    }),
  login: publicProcedure
    .input(loginFormSchema)
    .mutation(async ({ ctx, input }) => {
      const email = input.email;
      const user = await ctx.db.user.findUnique({
        where: {
          email,
        },
      });
      if (!user) {
        throw new Error("User not found");
      }
      const isMatch = bcrypt.compare(input.password, user.password);
      if (!isMatch) {
        throw new Error("Invalid otp");
      }
      return {
        success: true,
        data: {
          email,
        },
      };
    }),
  //   addCategory: publicProcedure
  //     .input(
  //       z.object({
  //         otp: z.string().min(1),
  //         email: z.string().email(),
  //       }),
  //     )
  //     .mutation(async ({ ctx, input }) => {
  //       const otp = input.otp;
  //       const email = input.email;
  //       const user = await ctx.db.user.findUnique({
  //         where: {
  //           email,
  //         },
  //       });
  //       if (!user) {
  //         throw new Error("User not found");
  //       }
  //       if (!user.otp) {
  //         throw new Error("User otp not found");
  //       }
  //       const isMatch = bcrypt.compare(otp, user.otp);
  //       if (!isMatch) {
  //         throw new Error("Invalid otp");
  //       }
  //       return ctx.db.user.update({
  //         where: {
  //           email: email,
  //         },
  //         data: {
  //           isVerify: true,
  //           otp: null,
  //         },
  //       });
  //     }),
});
