import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://api.servenow.site/api/:path*',
      },
    ];
  },
};

export default nextConfig;
