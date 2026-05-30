'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import {
  getPokemonAnimatedImage,
  getPokemonStaticImage,
} from '@/utils/pokemonDisplay';

type PokemonSpriteImageProps = {
  images?: string[] | null;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
  sizes?: string;
  priority?: boolean;
  style?: React.CSSProperties;
};

/** GIF 우선 표시, 경로 없음·로드 실패 시 PNG로 대체 */
export function PokemonSpriteImage({
  images,
  alt,
  fill,
  width = 120,
  height = 120,
  className,
  sizes,
  priority,
  style,
}: PokemonSpriteImageProps) {
  const animated = getPokemonAnimatedImage(images);
  const staticImg = getPokemonStaticImage(images);
  const [src, setSrc] = useState(animated ?? staticImg);

  useEffect(() => {
    setSrc(animated ?? staticImg);
  }, [animated, staticImg]);

  if (!src) return null;

  const handleError = () => {
    if (staticImg && src !== staticImg) setSrc(staticImg);
  };

  const common = {
    src,
    alt,
    unoptimized: true as const,
    className,
    priority,
    style,
    onError: handleError,
  };

  if (fill) {
    return <Image {...common} fill sizes={sizes} />;
  }

  return <Image {...common} width={width} height={height} />;
}
