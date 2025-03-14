import "./globals.css";
import './layout.scss';
import Head from "./head";
import Nav from "@/components/nav/Nav";
import Search from "@/components/search/Search";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <Head />
      <body>
        <Search />
        <Nav />
        {children}
      </body>
    </html>
  );
}

