import type { Metadata } from "next";
import gordita from "@/src/fonts/gordita";
import "./globals.css";
import { Toaster } from "@components/ui/sonner";

export const metadata: Metadata = {
  title: "But First Coffee",
  description: "San Francisco Biñan Laguna",
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
