export const dynamic = 'force-dynamic';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "올포유 - 팀 만들기",
  description: "포켓몬 팀 만들기, 포켓몬 추천, 포켓몬 팀 플랜, 포켓몬을 한개만 선택해도 타입을 보완하는 포켓몬을 추천해줍니다. ",
  openGraph: {
    title: "올포유 - 팀 만들기",
    description: "포켓몬을 한개만 선택해도 타입을 보완하는 포켓몬을 추천해줍니다. ",
    url: "https://allpoyou.vercel.app/make-team",
  },
};

export default function MakeTeamLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
