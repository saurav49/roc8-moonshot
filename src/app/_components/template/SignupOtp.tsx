import React from "react";
export type SignupOtpProps = {
  name: string;
  email: string;
  message?: string;
};
function SignupOtp({ name, message, email }: SignupOtpProps) {
  return (
    <div>
      <h1>Ecommerce sign up</h1>
      <p>
        From <strong>{name}</strong> at {email}
      </p>
      <h2>Message:</h2>
      <p>{message}</p>
    </div>
  );
}

export { SignupOtp };
