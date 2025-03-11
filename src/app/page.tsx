import BottomMenu from "@/components/bottomMenu/BottomMenu";
import FeedList from "@/components/feed/FeedList";

export default function Home() {
  return (
    <>
      <div className="content">
        메인
        <FeedList/>
      </div>
      <BottomMenu />
    </>
  );
}
