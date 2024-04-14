type SignupOtpProps = {
  email: string;
  otp: string;
};

import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

const SignupOtp = ({ email, otp }: SignupOtpProps) => (
  <Html>
    <Head />
    <Preview>Your login code for ROC8 Moonshot</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={heading}>Your login code for ROC8 Moonshot</Heading>
        <Section style={buttonContainer}>
          <Button
            style={button}
            href={`${process.env.WEB_URL}/otp?email=${email}`}
          >
            Login to ROC8 Moonshot
          </Button>
        </Section>
        <Text style={paragraph}>
          Thanks for starting the new ROC8 Moonshot account creation process. We
          want to make sure it&apos;s really you. Please enter the following
          verification code when prompted. If you don&apos;t want to create an
          account, you can ignore this message.
        </Text>
        <code style={code}>{otp}</code>
        <Hr style={hr} />
      </Container>
    </Body>
  </Html>
);

export { SignupOtp };

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
  maxWidth: "560px",
};

const heading = {
  fontSize: "24px",
  letterSpacing: "-0.5px",
  lineHeight: "1.3",
  fontWeight: "400",
  color: "#484848",
  padding: "17px 0 0",
};

const paragraph = {
  margin: "0 0 15px",
  fontSize: "15px",
  lineHeight: "1.4",
  color: "#3c4149",
};

const buttonContainer = {
  padding: "27px 0 27px",
};

const button = {
  backgroundColor: "#000",
  borderRadius: "3px",
  fontWeight: "600",
  color: "#fff",
  fontSize: "15px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  padding: "11px 23px",
};

const hr = {
  borderColor: "#dfe1e4",
  margin: "42px 0 26px",
};

const code = {
  fontFamily: "monospace",
  fontWeight: "700",
  padding: "1px 4px",
  backgroundColor: "#dfe1e4",
  letterSpacing: "-0.3px",
  fontSize: "21px",
  borderRadius: "4px",
  color: "#3c4149",
};
