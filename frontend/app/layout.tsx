import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProviderWrapper } from "./AuthProviderWrapper";
import { SnowProvider } from "./SnowProvider";
import { SnowfallWrapper } from "./SnowfallWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Java Course Site",
  description: "Обучающий материал по Java",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className="dark" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProviderWrapper>
          <SnowProvider>
            <SnowfallWrapper />
          {children}
          </SnowProvider>
        </AuthProviderWrapper>
      </body>
    </html>
  );
}
