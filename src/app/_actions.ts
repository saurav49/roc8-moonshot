"use server";

// import { Resend } from "resend";
import { render } from "@react-email/render";
import { SignupOtp } from "./_components/template/SignupOtp";
import nodemailer from "nodemailer";
// const resend = new Resend(process.env.RESEND_API_KEY);
// export const sendEmail = async (data: {
//   name: string;
//   email: string;
//   otp: string;
// }) => {
//   const { name, email, otp } = data;
//   try {
//     await resend.emails.send({
//       from: "Acme <onboarding@resend.dev>",
//       to: [email],
//       subject: "Ecommerce signup",
//       react: SignupOtp({
//         name,
//         email,
//         message: `Please enter otp : ${otp} to verify your account`,
//       }),
//     });
//   } catch (e) {
//     console.error("Error sending otp", e);
//   }
// };

// var nodemailer = require("nodemailer");
// //-----------------------------------------------------------------------------
export async function sendEmail(data: {
  name: string;
  email: string;
  otp: string;
}) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PW,
    },
  });

  const r = SignupOtp({ otp: data.otp, email: data.email });
  const signupOtpEmail = render(r);

  const mailOptions = {
    from: process.env.NODEMAILER_EMAIL,
    to: data.email,
    subject: `ROC8 Moonshot signup`,
    html: signupOtpEmail,
    // text: data.otp,
    // react: SignupOtp({
    //   username: data.name,
    //   email: data.email,
    //   message: `Please enter otp : ${data.otp} to verify your account`,
    // }),
  };

  transporter.sendMail(mailOptions, function (error) {
    if (error) {
      return false;
      // throw new Error(error);
    } else {
      console.log("Email Sent");
      return true;
    }
  });
}
