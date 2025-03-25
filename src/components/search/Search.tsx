'use client';
import React, { useState, useRef, useEffect } from 'react';
import { debounce } from 'lodash';
import s from './search.module.scss';
import classNames from 'classnames';

type ResultItem = {
  title: string;
  content: string;
};

const Search = () => {
  const [text, setText] = useState('');
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const resultItemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  // 검색 결과 항목
  const resultItems: ResultItem[] = [
    { title: '도감 검색', content: text },
    { title: '특성 검색', content: text },
    { title: '기술 검색', content: text },
    { title: '도구 검색', content: text },
    { title: '성격 검색', content: text },
  ];

  // 디바운스 검색
  const debouncedSearch = debounce((value: string) => {
    console.log(value);
  }, 1000);

  // 입력 변경 핸들러
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
    debouncedSearch(e.target.value);
  };

  // 키보드 네비게이션 핸들러 (input)
  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!text) return;

    switch (e.key) {
      case 'Tab':
        if (!e.shiftKey && focusedIndex === -1) {
          e.preventDefault();
          setFocusedIndex(0); // 첫 번째 항목 포커스
        }
        break;
    }
  };

  // 키보드 네비게이션 핸들러 (결과 항목)
  const handleItemKeyDown = (
    e: React.KeyboardEvent<HTMLDivElement>,
    index: number
  ) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setFocusedIndex(prev =>
          prev === resultItems.length - 1 ? 0 : prev + 1 // 마지막에서 첫 번째로 순환
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setFocusedIndex(prev =>
          prev === 0 ? resultItems.length - 1 : prev - 1 // 첫 번째에서 마지막으로 순환
        );
        break;
      case 'Enter':
        console.log(`Selected: ${resultItems[index].title}`);
        break;
      case 'Escape':
        inputRef.current?.focus();
        setFocusedIndex(-1);
        break;
    }
  };

  // 포커스 자동 이동
  useEffect(() => {
    if (focusedIndex >= 0) {
      resultItemsRef.current[focusedIndex]?.focus();
    }
  }, [focusedIndex]);

  // ref 배열 길이 동기화
  useEffect(() => {
    resultItemsRef.current = resultItemsRef.current.slice(0, resultItems.length);
  }, [resultItems.length]);

  return (
    <div className={classNames([s.input], {
      [s.is_text]: text
    })}>
      <input
        ref={inputRef}
        type="search"
        value={text}
        onChange={handleChange}
        onKeyDown={handleInputKeyDown}
        placeholder="통합 검색 (도감, 특성, 기술, 도구, 성격)"
      />
      {text && (
        <div className={s.results}>
          {resultItems.map((item, index) => (
            <div
              key={item.title}
              ref={el => {
                resultItemsRef.current[index] = el;
              }}
              tabIndex={0}
              className={classNames('', {
                [s.is_focus]: focusedIndex === index
              })}
              onKeyDown={(e) => handleItemKeyDown(e, index)}
              onClick={() => console.log(`Selected: ${resultItems[index].title}`)}
              onFocus={() => setFocusedIndex(index)}
              onMouseUp={() => setFocusedIndex(index)}
            >
              <span>{item.title}</span>
              {item.content}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;