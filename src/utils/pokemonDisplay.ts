/** DB `images` 배열: [공식 일러스트, Showdown 애니 GIF] */
export function getPokemonStaticImage(images?: string[] | null): string | undefined {
  return images?.[0] ?? undefined;
}

export function getPokemonAnimatedImage(images?: string[] | null): string | undefined {
  return images?.[1] ?? undefined;
}

export function hasPokemonImage(images?: string[] | null): boolean {
  return Boolean(getPokemonStaticImage(images) ?? getPokemonAnimatedImage(images));
}
