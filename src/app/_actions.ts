"use server";

import { Resend } from "resend";
import { signupFormSchema } from "~/lib/schema";
import { SignupOtp } from "./_components";
import { type z } from "zod";

type SignupFormFields = z.infer<typeof signupFormSchema>;
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
const resend = new Resend(process.env.RESEND_API_KEY);
export const sendEmail = async (data: SignupFormFields) => {
  const r = signupFormSchema.safeParse(data);
  if (r.success) {
    const { name, email } = r.data;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    await resend.emails.send({
      from: "biswassaurav71@gmail.com",
      to: [email],
      subject: "Ecommerce signup",
      react: SignupOtp({ name, email }),
    });
  }
  return {
    success: false,
    error: "Invalid sign up details",
  };
};
