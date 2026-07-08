import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/nav/Nav";
import { LastVisitedPageBootstrap } from "@/components/nav/LastVisitedPageBootstrap";
import FloatingBtn from "@/components/floatingBtn/FloatingBtn";
import { TeamSessionBootstrap } from "@/components/team/TeamSessionBootstrap";
import s from './main.module.scss'
import Footer from "@/components/footer/Footer";
import { Analytics } from "@vercel/analytics/react";
import TopButton from "@/components/topButton/TopButton";
import AuthContext from "@/components/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://allpoyou.vercel.app'),
  title: {
    default: "올포유",
    template: "올포유 | 포켓몬 파티 짜는 사이트",
  },
  description: "포켓몬, 포켓몬 팀 플래너, 포켓몬 파티 짜는 사이트",
  icons: {
    icon: "/images/러브볼.ico",
    shortcut: "/images/logo.png",
    apple: "/images/logo.png",
  },
  keywords: ["포켓몬", "포켓몬 팀 플래너", "포켓몬 파티 짜는 사이트", "올포유"],
  applicationName: "올포유",
  authors: [{ name: "올포유" }],
  verification: {
    google: "4kIu_8bINkiduTRiLtTNUYuw-pKWhPhPeSU1wkEb2yU",
  },
  category: 'Technology',
  // icons: {
  //   icon: "/favicon.ico",
  // },
  alternates: {
    canonical: "https://allpoyou.vercel.app",
  },
  openGraph: {
    title: "올포유",
    description: "포켓몬, 포켓몬 팀 플래너, 포켓몬 파티 짜는 사이트",
    url: "https://allpoyou.vercel.app",
    siteName: "올포유",
    locale: "ko_KR",
    type: "website",
    // images: [
    //   {
    //     url: "/og-image.png",
    //     width: 1200,
    //     height: 630,
    //     alt: "올포유 - 포켓몬, 포켓몬 팀 플래너, 포켓몬 파티 짜는 사이트",
    //   },
    // ],
  },
  twitter: {
    card: "summary_large_image",
    title: "올포유",
    description: "포켓몬, 포켓몬 팀 플래너, 포켓몬 파티 짜는 사이트",
    // images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="" suppressHydrationWarning>
        <AuthContext>
          <TeamSessionBootstrap />
          <LastVisitedPageBootstrap />
          <div className={s.main}>
            <Nav />
            <div className={s.page}>
              {children}
            </div>
            <TopButton />
            <FloatingBtn />
          </div>
          <Footer />
          <div id="modal" />
          <Analytics />
        </AuthContext>
      </body>
    </html>
  );
}
