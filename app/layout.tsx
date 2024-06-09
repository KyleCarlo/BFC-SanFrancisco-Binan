import type { Metadata } from "next";
import gordita from "./_fonts/gordita";
import "./globals.css";

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
    </html>
  );
}
