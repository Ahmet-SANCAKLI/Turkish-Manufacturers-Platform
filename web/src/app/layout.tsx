import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Turkey Manufacturers Platform",
  description: "B2B sourcing platform for Turkish manufacturers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
