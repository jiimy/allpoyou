'use client';
import React, { useState } from 'react';
import { debounce } from 'lodash';

const Search = () => {
  const [text, setText] = useState('');

  const debouncedSearch = debounce((value) => {
    console.log(value);
  }, 1000);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
    debouncedSearch(e.target.value);
  };

  // 임시
  const handleSearch = async () => {
    try {
      const res = await fetch('/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });

      if (res.ok) {
        const data = await res.json();
        // setResults(data); // 검색 결과를 상태에 저장
      } else {
        console.error('Search failed');
      }
    } catch (error) {
      console.error('Error searching:', error);
    }
  };

  return (
    <div>
      <input type="search" name="" id=""
        onChange={handleChange}
        value={text}
        placeholder='통합 검색 (도감, 특성, 기술, 도구, 성격)' />
    </div>
  );
};

export default Search;