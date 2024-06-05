import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const gordita = localFont({
  src: [
    { path: "./fonts/Gordita-Black.otf" },
    { path: "./fonts/Gordita-BlackItalic.otf" },
    { path: "./fonts/Gordita-Bold.otf" },
    { path: "./fonts/Gordita-BoldItalic.otf" },
    { path: "./fonts/Gordita-Light.otf" },
    { path: "./fonts/Gordita-LightItalic.otf" },
    { path: "./fonts/Gordita-Medium.otf" },
    { path: "./fonts/Gordita-MediumItalic.otf" },
    { path: "./fonts/Gordita-Regular.otf" },
    { path: "./fonts/Gordita-RegularItalic.otf" },
  ],
});

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
      <body className={gordita.className}>{children}</body>
    </html>
  );
}
