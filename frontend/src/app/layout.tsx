import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";
import SessionWrapper from "@/components/layouts/SessionWrapper";

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
    <SessionWrapper>
      <html lang="en">
        <body>{children}</body>
        <Toaster richColors />
      </html>
    </SessionWrapper>
  );
}
