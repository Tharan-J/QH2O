import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "QH2O - Portable Water Quality Monitoring SaaS",
  description: "Real-Time Water Purity, Anywhere. The ultimate portable sensor for your home, aquarium, and garden.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} font-sans antialiased text-foreground bg-background`}
      >
        {children}
      </body>
    </html>
  );
}
