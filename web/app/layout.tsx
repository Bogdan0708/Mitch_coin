import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MitchCoin - Gothic Street Food Loyalty Token",
  description: "Earn and spend MitchCoin at Mitch from Transylvania's gothic street food stalls",
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
