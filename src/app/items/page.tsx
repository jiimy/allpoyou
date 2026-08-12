import ItemList from './ItemList';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '올포유 - 아이템 ',
  description: '포켓몬 아이템 목록, 올포유 포켓몬 아이템 목록, 포켓몬 아이템 종류',
  openGraph: {
    title: '올포유 - 아이템',
    description: '포켓몬 아이템 목록, 올포유 포켓몬 아이템 목록, 포켓몬 아이템 종류',
    url: 'https://allpoyou.vercel.app/items',
  },
};

const ItemPage = () => {
  return <ItemList />;
};

export default ItemPage;
