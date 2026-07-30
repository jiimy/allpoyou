export const dynamic = 'force-dynamic';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "팀 만들기",
  description: "포켓몬을 한개만 선택해도 타입을 보완하는 포켓몬을 추천해줍니다. ",
  icons: {
    icon: "/images/러브볼.ico",
    shortcut: "/images/러브볼.ico",
    apple: "/images/러브볼.ico",
  },
};

export default function MakeTeamLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
