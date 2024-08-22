import type { Metadata } from "next";
import gordita from "@/src/fonts/gordita";
import "./globals.css";
import { Toaster } from "@components/ui/sonner";

export const metadata: Metadata = {
  title: "But First Coffee SFB",
  description:
    "We are located in San Francisco Biñan Laguna. We serve coffee, pastries, and meals with reliable internet connection and convenient workspaces.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={gordita.variable}>{children}</body>
      <Toaster richColors position="top-right" />
    </html>
  );
}
