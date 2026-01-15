import { Button, Heading, Section, Text } from "@react-email/components";
import { siteConfig } from "../lib/siteconfig";
import { EmailLayout } from "./components/email-layout";

interface ResetPasswordEmailProps {
  name: string;
  resetLink: string;
}

export function ResetPasswordEmail({
  name,
  resetLink,
}: ResetPasswordEmailProps) {
  return (
    <EmailLayout preview={`Reset your password for ${siteConfig.name}`}>
      <Heading style={heading}>Reset your password</Heading>

      <Text style={paragraph}>Hi {name},</Text>

      <Text style={paragraph}>
        We received a request to reset your password for your VastgoedFotoAI.nl account.
        Click the button below to choose a new password.
      </Text>

      <Section style={buttonContainer}>
        <Button href={resetLink} style={button}>
          Reset Password
        </Button>
      </Section>

      <Text style={note}>
        This link will expire in 1 hour. If you didn&apos;t request a password
        reset, you can safely ignore this email. Your password will remain
        unchanged.
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

export default ResetPasswordEmail;
