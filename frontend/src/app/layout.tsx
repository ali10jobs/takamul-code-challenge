import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Noto_Sans_Arabic } from "next/font/google";
import "./globals.css";
import StoreProvider from "@/store/StoreProvider";
import I18nProvider from "@/i18n/I18nProvider";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import RtlWrapper from "@/components/layout/RtlWrapper";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const notoArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  variable: "--font-noto-arabic",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Takamul Technologies - Legal Services",
  description:
    "CMS-driven headless architecture frontend for legal consultation services",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${notoArabic.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <StoreProvider>
          <I18nProvider>
            <RtlWrapper>
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </RtlWrapper>
          </I18nProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
