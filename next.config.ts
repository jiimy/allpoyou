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
        hostname: 'raw.githubusercontent.com',
        pathname: '/PokeAPI/sprites/**',
      },
    ],
  },
  sassOptions: {
    additionalData: `
    @use "@/assets/styles/mixins" as *;
    @use "@/assets/styles/variables" as *;
  `,
  },
};

export default nextConfig;
