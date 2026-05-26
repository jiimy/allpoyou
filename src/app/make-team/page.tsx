'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { useOutOfClick } from '@/hooks/useOutOfClick';
import { createClient } from '@/utils/supabase/client';

type Suggestion = {
  number: number;
  name: string;
};

const TEAM_SIZE = 6;

const PLACEHOLDERS = [
  '첫번째 포켓몬',
  '두번째 포켓몬',
  '세번째 포켓몬',
  '네번째 포켓몬',
  '다섯번째 포켓몬',
  '여섯번째 포켓몬',
];

const MakeTeam = () => {
  const supabase = useMemo(() => createClient(), []);

  const [values, setValues] = useState<string[]>(() =>
    Array.from({ length: TEAM_SIZE }, () => ''),
  );
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

  // 바깥 영역 클릭 시 드롭다운 닫기
  const handleOutsideClick = useCallback(() => {
    setActiveIndex(null);
  }, []);
  useOutOfClick(wrapperRef, handleOutsideClick);

  // 활성 input 값이 바뀌면 디바운스해서 supabase 조회
  useEffect(() => {
    if (activeIndex === null) return;

    const keyword = values[activeIndex].trim();

    const timer = setTimeout(async () => {
      if (!keyword) {
        setSuggestions([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      const { data, error } = await supabase
        .from('pokemon')
        .select('number, name')
        .ilike('name', `%${keyword}%`)
        .order('number', { ascending: true })
        .limit(10);

      if (!error && data) {
        setSuggestions(data as Suggestion[]);
      } else {
        setSuggestions([]);
      }
      setHighlightedIndex(0);
      setLoading(false);
    }, 200);

    return () => clearTimeout(timer);
  }, [activeIndex, values, supabase]);

  // 하이라이트가 바뀌면 보이도록 스크롤
  useEffect(() => {
    const el = itemRefs.current[highlightedIndex];
    if (el) el.scrollIntoView({ block: 'nearest' });
  }, [highlightedIndex]);

  const handleChange = (index: number, value: string) => {
    setValues((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  };

  const handleSelect = (index: number, suggestion: Suggestion) => {
    setValues((prev) => {
      const next = [...prev];
      next[index] = suggestion.name;
      return next;
    });
    setSuggestions([]);
    setActiveIndex(null);
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    const dropdownOpen =
      activeIndex === index &&
      values[index].trim().length > 0 &&
      !loading &&
      suggestions.length > 0;

    if (!dropdownOpen) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev + 1) % suggestions.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex(
        (prev) => (prev - 1 + suggestions.length) % suggestions.length,
      );
    } else if (e.key === ' ') {
      e.preventDefault();
      const picked = suggestions[highlightedIndex];
      if (picked) handleSelect(index, picked);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setActiveIndex(null);
    }
  };

  return (
    <div>
      팀만들기
      <div ref={wrapperRef}>
        {PLACEHOLDERS.map((placeholder, index) => {
          const isActive = activeIndex === index;
          const showDropdown =
            isActive && values[index].trim().length > 0;

          return (
            <div
              key={index}
              style={{ position: 'relative', marginBottom: 8 }}
            >
              <input
                type="text"
                placeholder={placeholder}
                value={values[index]}
                onChange={(e) => handleChange(index, e.target.value)}
                onFocus={() => {
                  setActiveIndex(index);
                  setHighlightedIndex(0);
                }}
                onKeyDown={(e) => handleKeyDown(e, index)}
                autoComplete="off"
                style={{
                  width: 240,
                  padding: '8px 10px',
                  border: '1px solid #ccc',
                  borderRadius: 4,
                }}
              />
              {showDropdown && (
                <ul
                  style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    width: 240,
                    margin: 0,
                    padding: 0,
                    listStyle: 'none',
                    border: '1px solid #ddd',
                    borderRadius: 4,
                    background: '#fff',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                    zIndex: 10,
                    maxHeight: 240,
                    overflowY: 'auto',
                  }}
                >
                  {loading && (
                    <li style={{ padding: '8px 10px', color: '#888' }}>
                      검색중...
                    </li>
                  )}
                  {!loading && suggestions.length === 0 && (
                    <li style={{ padding: '8px 10px', color: '#888' }}>
                      검색 결과 없음
                    </li>
                  )}
                  {!loading &&
                    suggestions.map((s, i) => {
                      const isHighlighted = i === highlightedIndex;
                      return (
                        <li
                          key={s.number}
                          ref={(el) => {
                            itemRefs.current[i] = el;
                          }}
                          onMouseDown={(e) => {
                            // input blur 보다 먼저 동작하도록 mousedown 사용
                            e.preventDefault();
                            handleSelect(index, s);
                          }}
                          onMouseEnter={() => setHighlightedIndex(i)}
                          style={{
                            padding: '8px 10px',
                            cursor: 'pointer',
                            borderBottom: '1px solid #f0f0f0',
                            background: isHighlighted ? '#f0f7ff' : '#fff',
                          }}
                        >
                          <span style={{ color: '#888', marginRight: 6 }}>
                            #{s.number}
                          </span>
                          {s.name}
                        </li>
                      );
                    })}
                </ul>
              )}
            </div>
          );
        })}
      </div>
      <div>
        <h2>추천 포켓몬</h2>
      </div>
    </div>
  );
};

export default MakeTeam;
