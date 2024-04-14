"use server";

import { render } from "@react-email/render";
import { SignupOtp } from "./_components/template/SignupOtp";
import nodemailer from "nodemailer";

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
  };

  await new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, function (error) {
      if (error) {
        reject(false);
      } else {
        console.log("Email Sent");
        resolve(true);
      }
    });
  });
}
