import "./globals.css";
import './layout.scss';
import Head from "./head";
import Nav from "@/components/nav/Nav";
import Search from "@/components/search/Search";
import QueryProviders from "@/provider/queryProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <Head />
      <body>
        <QueryProviders>
          <Nav />
          <Search />
          {children}
        </QueryProviders>
        <div id="modal" />
      </body>
    </html>
  );
}

