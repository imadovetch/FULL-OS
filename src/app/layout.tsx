import type { Metadata } from "next";
import { Tajawal } from "next/font/google";
import "./globals.css";


const tajawal = Tajawal({ subsets: ["latin"], weight: ['200', '400', '800'] });

export const metadata: Metadata = {
  title: "Full os",
  description: "all application you need",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={tajawal.className}>{children}</body>
    </html>
  );
}
