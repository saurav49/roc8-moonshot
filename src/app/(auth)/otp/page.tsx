import React from "react";
import { Otp } from "~/app/_components/";

const SignupOtpPage = ({
  searchParams,
}: {
  searchParams: { email: string };
}) => {
  return (
    <Otp
      message={"Enter the 8 digit code you have received on"}
      email={searchParams.email}
    />
  );
};

export default SignupOtpPage;
