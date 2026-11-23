import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'play.pokemonshowdown.com',
      },
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        pathname: '/PokeAPI/sprites/**',
      },
      {
        protocol: 'https',
        hostname: 'etbddsmzchzwmidplocy.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: 's-stats-platform-cdn.op.gg',
        pathname: '/pokemon-champions/images/**',
      },
    ],
  },
  sassOptions: {
    additionalData: `
    @use "@/assets/styles/mixins" as *;
    @use "@/assets/styles/variables" as *;
  `,
  },
  /**
   * HTML/문서만 짧게 캐시해 배포 직후 구 HTML ↔ 신 JS 청크 불일치를 줄입니다.
   * `/_next/static`·이미지·확장자 있는 정적 파일은 제외합니다.
   */
  async headers() {
    return [
      {
        source: '/((?!_next/static|_next/image|.*\\..*).*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, must-revalidate',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
