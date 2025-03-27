'use client';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useInfiniteQuery } from "@tanstack/react-query";
import { getPoketmonListAll } from '@/api/pokemonBook';
import { useInView } from "react-intersection-observer";
import PokemonItem from './PokemonItem';
import { getKoreanName } from '@/api/pokemonNameConvert';

interface Pokemon {
  name: string;
  url: string;
  koreanName?: string;
}

const PokemonList = () => {
  const [ref, isView] = useInView();
  const [translatedPokemons, setTranslatedPokemons] = useState<Pokemon[]>([]);

  const params = useSearchParams();
  const search = params.get('query');
  const size = 5;

  const {
    data: pokemonListAll,
    fetchNextPage: pokemonListAllFetchNextPage,
    hasNextPage: pokemonListAllHasNextPage,
    status: pokemonListAllStatus,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["jupjupList", search || ''],
    queryFn: async ({ pageParam = 0 }) => {
      const response = await getPoketmonListAll({
        searchInputValue: search || '',
        pageParam,
        offset: size,
      });
      return response;
    },
    refetchOnMount: true,
    staleTime: 60 * 1000,
    refetchOnWindowFocus: true,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === size ? allPages.length : undefined;
    },
    initialPageParam: 0,
  });

  useEffect(() => {
    if (isView && pokemonListAllHasNextPage && !isFetchingNextPage) {
      pokemonListAllFetchNextPage();
    }
  }, [isView, pokemonListAllHasNextPage, pokemonListAllFetchNextPage, isFetchingNextPage]);

  // 한국어 번역 적용 (null 값 처리 강화)
  useEffect(() => {
    const translatePokemonNames = async () => {
      if (!pokemonListAll?.pages) return;

      const allPokemons = pokemonListAll.pages.flatMap(page => page.results);
      
      // 기존 데이터를 먼저 설정하고, 번역은 점진적으로 업데이트
      setTranslatedPokemons(allPokemons.map(pokemon => ({
        name: pokemon.name,
        url: pokemon.url,
        koreanName: pokemon.name // 기본값으로 영어 이름 설정
      })));

      // 병렬 처리 시 요청 수 제한 (너무 많은 동시 요청 방지)
      const batchSize = 10;
      for (let i = 0; i < allPokemons.length; i += batchSize) {
        const batch = allPokemons.slice(i, i + batchSize);
        
        const translatedBatch = await Promise.all(
          batch.map(async (pokemon) => {
            try {
              const translated = await getKoreanName(pokemon.name);
              return {
                name: pokemon.name,
                url: pokemon.url,
                koreanName: translated || pokemon.name // null 대체 처리
              };
            } catch (error) {
              console.error(`Error translating ${pokemon.name}:`, error);
              return {
                name: pokemon.name,
                url: pokemon.url,
                koreanName: pokemon.name // 에러 시 영어 이름 유지
              };
            }
          })
        );

        // 기존 데이터 업데이트
        setTranslatedPokemons(prev => {
          const newData = [...prev];
          translatedBatch.forEach((translated, index) => {
            newData[i + index] = translated;
          });
          return newData;
        });
      }
    };

    translatePokemonNames();
  }, [pokemonListAll]);

  console.log('번역 : ', translatedPokemons)

  return (
    <div>
      포켓몬 리스트
      {pokemonListAllStatus === "success" && (
        <div className="list-container">
          {translatedPokemons.map((pokemon, index) => (
            <PokemonItem 
              key={`${pokemon.name}-${index}`} 
              pokemons={{
                ...pokemon,
                name: pokemon.koreanName || pokemon.name // koreanName이 없는 경우 원래 이름 사용
              }} 
            />
          ))}
          {isFetchingNextPage && <div>Loading more...</div>}
          <div ref={ref} style={{ height: '10px' }} />
        </div>
      )}
      {pokemonListAllStatus === "pending" && <div>Loading...</div>}
      {pokemonListAllStatus === "error" && <div>Error loading data</div>}
    </div>
  );
};

export default PokemonList;