import Image from "next/image";
import TypeSelect from "@/components/type/TypeSelect";
import s from './main.module.scss';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center flex-1 font-sans bg-zinc-50 dark:bg-black">
      {/* <TypeSelect /> */}
      <input type="text" placeholder="팀에 소속된 포켓몬 검색" />
      <div className={s.listWrap}>
        {/* 리스트 보여주기 — 슬롯 1~6을 한 줄에 2개씩 */}
        <div className={s.listItem}>
          <div>1</div>
          <div>2</div>
          <div>3</div>
          <div>4</div>
          <div>5</div>
          <div>6</div>
        </div>
        <div className={s.listItem}>
          <div>1</div>
          <div>2</div>
          <div>3</div>
          <div>4</div>
          <div>5</div>
          <div>6</div>
        </div>
        <div className={s.listItem}>
          <div>1</div>
          <div>2</div>
          <div>3</div>
          <div>4</div>
          <div>5</div>
          <div>6</div>
        </div>
        <div className={s.listItem}>
          <div>1</div>
          <div>2</div>
          <div>3</div>
          <div>4</div>
          <div>5</div>
          <div>6</div>
        </div>
        <div className={s.listItem}>
          <div>1</div>
          <div>2</div>
          <div>3</div>
          <div>4</div>
          <div>5</div>
          <div>6</div>
        </div>
      </div>
    </div>
  );
}
