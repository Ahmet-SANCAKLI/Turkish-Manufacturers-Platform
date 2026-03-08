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
      <body className="antialiased">
        <div className="bg-amber-100 px-4 py-2 text-center text-sm font-medium text-amber-900 ring-1 ring-amber-200">
          Bu site yapim asamasindadir.
        </div>
        {children}
      </body>
    </html>
  );
}
