import "./globals.css";
import './layout.scss';
import Head from "./head";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <Head />
      <body>
        <main className="main">
          <div className="mobile-view">
            <div>
              {children}
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}

