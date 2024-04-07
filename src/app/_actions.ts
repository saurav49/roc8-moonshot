"use server";

import { Resend } from "resend";
import { SignupOtp } from "./_components";

const resend = new Resend(process.env.RESEND_API_KEY);
export const sendEmail = async (data: {
  name: string;
  email: string;
  otp: string;
}) => {
  const { name, email, otp } = data;
  await resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to: [email],
    subject: "Ecommerce signup",
    react: SignupOtp({
      name,
      email,
      message: `Please enter otp : ${otp} to verify your account`,
    }),
  });
  // return {
  //   msg: "email send successfully",
  // };
};
