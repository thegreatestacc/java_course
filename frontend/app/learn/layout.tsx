import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Java Course Site",
  description: "Обучающий материал по Java",
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },
};

export default function LearnLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}

