'use client';

import Image from 'next/image';
import { useEffect, useMemo, useRef, useState } from 'react';

import SearchBar from '@/components/searchBar/SearchBar';
import {
  getItemSpriteUrl,
  ITEM_GROUPS,
  type ItemGroupId,
} from '@/constants/itemCategoryGroups';
import type { ItemKr } from '@/types/item';
import itemsData from '../../../public/data/item.json';

import s from './items.module.scss';

const items = itemsData as ItemKr[];
const PAGE_SIZE = 24;

function ItemCard({ item }: { item: ItemKr }) {
  const [imageError, setImageError] = useState(false);

  return (
    <article className={s.card}>
      <div className={s.imageWrap}>
        {imageError ? (
          <span className={s.imageFallback}>이미지 없음</span>
        ) : (
          <Image
            src={getItemSpriteUrl(item.name)}
            alt={item.nameKo}
            width={48}
            height={48}
            className={s.image}
            onError={() => setImageError(true)}
          />
        )}
      </div>
      <h3 className={s.name}>{item.nameKo}</h3>
      <p className={s.meta}>
        #{item.id} · {item.cost > 0 ? `${item.cost.toLocaleString()}원` : '가격 없음'}
      </p>
      <p className={s.description}>{item.description}</p>
    </article>
  );
}

export default function ItemList() {
  const [keyword, setKeyword] = useState('');
  const [activeGroup, setActiveGroup] = useState<ItemGroupId>('all');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const filteredItems = useMemo(() => {
    const activeCategories =
      ITEM_GROUPS.find((group) => group.id === activeGroup)?.categories ?? null;

    const byCategory =
      activeGroup === 'all'
        ? items
        : items.filter((item) => activeCategories?.includes(item.categoryKo));

    const q = keyword.trim();
    if (!q) return byCategory;

    const qLower = q.toLowerCase();
    return byCategory.filter(
      (item) =>
        item.nameKo.includes(q) ||
        item.description.includes(q) ||
        item.name.toLowerCase().includes(qLower),
    );
  }, [activeGroup, keyword]);

  const visibleItems = useMemo(
    () => filteredItems.slice(0, visibleCount),
    [filteredItems, visibleCount],
  );

  const hasMore = visibleCount < filteredItems.length;

  const [prevGroup, setPrevGroup] = useState(activeGroup);
  const [prevKeyword, setPrevKeyword] = useState(keyword);
  if (prevGroup !== activeGroup) {
    setPrevGroup(activeGroup);
    setVisibleCount(PAGE_SIZE);
  }
  if (prevKeyword !== keyword) {
    setPrevKeyword(keyword);
    setVisibleCount(PAGE_SIZE);
  }

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setVisibleCount((prev) => Math.min(prev + PAGE_SIZE, filteredItems.length));
        }
      },
      { rootMargin: '240px' },
    );

    observer.observe(sentinel);

    return () => observer.disconnect();
  }, [filteredItems.length, hasMore]);

  return (
    <div className={s.page}>
      <SearchBar
        keyword={keyword}
        onKeywordChange={setKeyword}
        placeholderType="item"
      />

      <div className={s.filters}>
        {ITEM_GROUPS.map((group) => (
          <button
            key={group.id}
            type="button"
            className={`${s.filterBtn} ${activeGroup === group.id ? s.filterBtnActive : ''}`}
            onClick={() => setActiveGroup(group.id)}
          >
            {group.label}
          </button>
        ))}
      </div>

      <p className={s.resultCount}>
        {filteredItems.length.toLocaleString()}개 / {items.length.toLocaleString()}개
      </p>

      <div className={s.grid}>
        {visibleItems.length > 0 ? (
          visibleItems.map((item) => <ItemCard key={item.id} item={item} />)
        ) : (
          <p className={s.empty}>조건에 맞는 도구가 없습니다.</p>
        )}
        {hasMore ? <div ref={sentinelRef} className={s.sentinel} aria-hidden /> : null}
      </div>
    </div>
  );
}
