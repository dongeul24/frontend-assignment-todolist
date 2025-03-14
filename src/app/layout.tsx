import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "todolist",
  description: "투두리스트 사이트",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <Header />
        <Providers>
          <main className="mx-auto max-w-[1200px]">{children}</main>
        </Providers>
        <Footer />
      </body>
    </html>
  );
}
