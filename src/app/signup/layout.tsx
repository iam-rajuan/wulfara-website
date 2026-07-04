import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up | WULFARA - Create Your Buyer Account",
  description:
    "Create your WULFARA account to access RFQs, save suppliers, manage messages, and streamline your industrial procurement workflow.",
};

export default function SignUpLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
