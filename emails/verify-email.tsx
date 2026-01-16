import { Button, Heading, Section, Text } from "@react-email/components";
import { siteConfig } from "../lib/siteconfig";
import { EmailLayout } from "./components/email-layout";

interface VerifyEmailProps {
  name: string;
  verifyLink: string;
}

export function VerifyEmail({ name, verifyLink }: VerifyEmailProps) {
  return (
    <EmailLayout preview={`Verify your email address for ${siteConfig.name}`}>
      <Heading style={heading}>Verify your email address</Heading>

      <Text style={paragraph}>Hi {name},</Text>

      <Text style={paragraph}>
        Thanks for signing up for VastgoedFotoAI.nl! Please verify your email
        address to get started with AI-powered real estate photo editing.
      </Text>

      <Section style={buttonContainer}>
        <Button href={verifyLink} style={button}>
          Verify Email Address
        </Button>
      </Section>

      <Text style={note}>
        This verification link will expire in 24 hours. If you didn&apos;t
        create an account with VastgoedFotoAI.nl, you can safely ignore this
        email.
      </Text>

      <Text style={signature}>
        Best,
        <br />
        The VastgoedFotoAI.nl Team
      </Text>
    </EmailLayout>
  );
}

// Styles
const heading = {
  color: "#1A1A1A",
  fontSize: "24px",
  fontWeight: "600" as const,
  lineHeight: "32px",
  margin: "0 0 24px",
};

const paragraph = {
  color: "#1A1A1A",
  fontSize: "16px",
  lineHeight: "26px",
  margin: "0 0 16px",
};

const buttonContainer = {
  textAlign: "center" as const,
  margin: "32px 0",
};

const button = {
  backgroundColor: "#3B9B9B",
  borderRadius: "8px",
  color: "#ffffff",
  fontSize: "16px",
  fontWeight: "600" as const,
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
  padding: "14px 32px",
};

const note = {
  color: "#6B7280",
  fontSize: "14px",
  lineHeight: "22px",
  margin: "24px 0 0",
};

const signature = {
  color: "#1A1A1A",
  fontSize: "16px",
  lineHeight: "26px",
  margin: "32px 0 0",
};

export default VerifyEmail;
