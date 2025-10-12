// import type { NextConfig } from 'next';

// const nextConfig: NextConfig = {
//   async rewrites() {
//     return [
//       {
//         source: '/api/:path*',
//         destination: 'https://api.servenow.site/api/:path*',
//       },
//     ];
//   },
// };

import type { NextConfig } from 'next';

import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      // BFF 예외 처리
      {
        source: '/api/bff/:path*',
        destination: '/api/bff/:path*',
      },
      // 나머지는 외부 서버로
      {
        source: '/api/:path*',
        destination: 'https://api.servenow.site/api/:path*',
      },
    ];
  },
};

export default withBundleAnalyzer(nextConfig);
