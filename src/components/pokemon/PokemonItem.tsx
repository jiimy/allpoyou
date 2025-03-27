import React from 'react';

type pockemonIndexType = {
  pokemons: PokemonLink;
}

type PokemonLink = {
  name: string;
  url: string;
}

const PokemonItem = ({ pokemons }: pockemonIndexType) => {
  
  if (!pokemons) {
    return <div>포켓몬 데이터를 불러올 수 없습니다.</div>;
  }

  // console.log("PokemonItem received pokemons:", pokemons);

  return (
    <div>
      포켓몬 이름 번역111 <br />
      이름: {pokemons?.name} <br />
      URL: {pokemons?.url} <br />
      {/* {getPokemonByKoreanName(pokemons?.name)} */}
    </div>
  );
};

export default PokemonItem;