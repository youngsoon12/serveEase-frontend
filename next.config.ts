import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://3.39.230.117:8080/api/:path*',
      },
    ];
  },
};

export default nextConfig;
