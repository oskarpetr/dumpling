import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dumpling",
  description: "Dumpling is a language learning app.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
