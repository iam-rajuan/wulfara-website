import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | WULFARA - Access Your Buyer Account",
  description:
    "Log in to your WULFARA account to access RFQs, saved suppliers, messages, and manage your industrial procurement workflow.",
};

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
