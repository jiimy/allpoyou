/** DB/CSV `images` 배열: [공식 일러스트 PNG, Showdown 애니 GIF] */

function normalizeImageUrl(url: string | undefined): string | undefined {
  const trimmed = url?.trim();
  return trimmed || undefined;
}

export function getPokemonStaticImage(images?: string[] | null): string | undefined {
  return normalizeImageUrl(images?.[0]);
}

export function getPokemonAnimatedImage(images?: string[] | null): string | undefined {
  return normalizeImageUrl(images?.[1]);
}

export function hasPokemonImage(images?: string[] | null): boolean {
  return Boolean(
    getPokemonStaticImage(images) || getPokemonAnimatedImage(images),
  );
}

/** GIF 우선, 없으면 PNG (경로만; 로드 실패는 컴포넌트 onError로 처리) */
export function getPokemonPreferredImage(images?: string[] | null): string | undefined {
  return getPokemonAnimatedImage(images) ?? getPokemonStaticImage(images);
}
