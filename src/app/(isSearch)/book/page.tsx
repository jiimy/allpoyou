import PokemonList from '@/components/pokemon/PokemonList';
import { useSearchParams } from 'next/navigation';
import React from 'react';

const BookPage = () => {
  return (
    <div>
      그냥 들어왔다면 
      도감 보여주기
      <PokemonList />
    </div>
  );
};

export default BookPage;