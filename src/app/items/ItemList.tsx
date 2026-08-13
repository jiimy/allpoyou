'use client';

import Image from 'next/image';
import { useEffect, useMemo, useRef, useState } from 'react';

import { FilterButton } from '@/components/button/Button';
import StickySearchBar from '@/components/searchBar/StickySearchBar';
import {
  getItemGroupId,
  getItemSpriteFallbackUrl,
  getItemSpriteUrl,
  ITEM_GROUPS,
  type ItemGroupId,
} from '@/constants/itemCategoryGroups';
import { useItemPickStore } from '@/store/ItemPickStore';
import { usePochampsStore } from '@/store/PochampsStore';
import { useTeamModalStore } from '@/store/TeamModalStore';
import type { ItemKr } from '@/types/item';
import itemsData from '../../../public/data/item.json';

import s from './items.module.scss';

const items = itemsData as ItemKr[];
const PAGE_SIZE = 24;

function isHeldItem(item: ItemKr): boolean {
  return getItemGroupId(item.categoryKo) === 'held';
}

function isPochamsItem(item: ItemKr): boolean {
  return item.availableTypes?.includes('poChams') === true;
}

function ItemCard({
  item,
  selectable,
  showBattlePoint,
  onSelect,
}: {
  item: ItemKr;
  selectable: boolean;
  showBattlePoint: boolean;
  onSelect?: () => void;
}) {
  const primarySrc = getItemSpriteUrl(item.name);
  const fallbackSrc = getItemSpriteFallbackUrl(item.name);
  const [src, setSrc] = useState(primarySrc);
  const [imageError, setImageError] = useState(false);

  const handleClick = () => {
    if (!selectable) return;
    onSelect?.();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (!selectable) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelect?.();
    }
  };

  const handleImageError = () => {
    if (src !== fallbackSrc) {
      setSrc(fallbackSrc);
      return;
    }
    setImageError(true);
  };

  const priceLabel =
    item.cost > 0 ? `${item.cost.toLocaleString()}원` : '가격 없음';
  const battlePointLabel =
    showBattlePoint && item.battlePoint != null
      ? `BP ${item.battlePoint.toLocaleString()}`
      : '';

  return (
    <article
      className={`${s.card} ${selectable ? s.cardSelectable : ''}`}
      role={selectable ? 'button' : undefined}
      tabIndex={selectable ? 0 : undefined}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      <div className={s.imageWrap}>
        {imageError ? (
          <span className={s.imageFallback}>이미지 없음</span>
        ) : (
          <Image
            src={src}
            alt={item.nameKo}
            width={48}
            height={48}
            className={s.image}
            onError={handleImageError}
          />
        )}
      </div>
      <h3 className={s.name}>{item.nameKo}</h3>
      <p className={s.meta}>
        {/* #{item.id} ·  */}
        {isPochamsItem(item) ? '' : `${priceLabel} · `}
        {battlePointLabel}
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
  const setPendingItem = useItemPickStore((state) => state.setPendingItem);
  const setTeamModalOpen = useTeamModalStore((state) => state.setIsOpen);
  const pochampsEnabled = usePochampsStore((state) => state.enabled);
  const pochampsHydrated = usePochampsStore((state) => state.hasHydrated);
  const pochampsActive = pochampsHydrated && pochampsEnabled;

  const handleItemSelect = (item: ItemKr) => {
    setPendingItem(item);
    setTeamModalOpen(true);
  };

  const filteredItems = useMemo(() => {
    const activeCategories =
      ITEM_GROUPS.find((group) => group.id === activeGroup)?.categories ?? null;

    let byCategory =
      activeGroup === 'all'
        ? items
        : items.filter((item) => activeCategories?.includes(item.categoryKo));

    // 포챔스 ON + 지참/전투: availableTypes에 poChams가 있는 항목만
    if (pochampsActive && activeGroup === 'held') {
      byCategory = byCategory.filter(isPochamsItem);
    }

    const q = keyword.trim();
    if (!q) return byCategory;

    const qLower = q.toLowerCase();
    return byCategory.filter(
      (item) =>
        item.nameKo.includes(q) ||
        item.description.includes(q) ||
        item.name.toLowerCase().includes(qLower),
    );
  }, [activeGroup, keyword, pochampsActive]);

  const visibleItems = useMemo(
    () => filteredItems.slice(0, visibleCount),
    [filteredItems, visibleCount],
  );

  const hasMore = visibleCount < filteredItems.length;

  const [prevFilterKey, setPrevFilterKey] = useState(
    `${activeGroup}\u0000${keyword}\u0000${pochampsActive}`,
  );
  const filterKey = `${activeGroup}\u0000${keyword}\u0000${pochampsActive}`;
  if (prevFilterKey !== filterKey) {
    setPrevFilterKey(filterKey);
    setVisibleCount(PAGE_SIZE);
  }

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setVisibleCount((prev) =>
            Math.min(prev + PAGE_SIZE, filteredItems.length),
          );
        }
      },
      { rootMargin: '240px' },
    );

    observer.observe(sentinel);

    return () => observer.disconnect();
  }, [filteredItems.length, hasMore]);

  return (
    <div className={s.page}>
      <StickySearchBar
        keyword={keyword}
        onKeywordChange={setKeyword}
        placeholderType="item"
      />

      <div className={s.filters}>
        {ITEM_GROUPS.map((group) => (
          <FilterButton
            key={group.id}
            type="button"
            active={activeGroup === group.id}
            onClick={() => setActiveGroup(group.id)}
          >
            {group.label}
          </FilterButton>
        ))}
      </div>

      <p className={s.resultCount}>
        {filteredItems.length.toLocaleString()}개 /{' '}
        {items.length.toLocaleString()}개
        {pochampsActive && activeGroup === 'held' ? ' · 포챔스 - 추가중..' : ''}
      </p>

      <div className={s.grid}>
        {visibleItems.length > 0 ? (
          visibleItems.map((item) => (
            <ItemCard
              key={item.id}
              item={item}
              selectable={activeGroup === 'held' || isHeldItem(item)}
              showBattlePoint={pochampsActive}
              onSelect={() => handleItemSelect(item)}
            />
          ))
        ) : (
          <p className={s.empty}>조건에 맞는 도구가 없습니다.</p>
        )}
        {hasMore ? (
          <div ref={sentinelRef} className={s.sentinel} aria-hidden />
        ) : null}
      </div>
    </div>
  );
}
