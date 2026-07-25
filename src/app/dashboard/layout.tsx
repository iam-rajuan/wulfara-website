import type { Metadata } from "next";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import ProtectedRoute from "@/components/shared/ProtectedRoute";

export const metadata: Metadata = {
  title: "Dashboard | WULFARA - Buyer Overview",
  description:
    "Your centralized buyer dashboard to manage RFQs, suppliers, messages, and procurement activity.",
};

export default function DashboardRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ProtectedRoute>
      <DashboardLayout>{children}</DashboardLayout>
    </ProtectedRoute>
  );
}
