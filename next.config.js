/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // 요청 두번 자꾸 보내는데 쓰잘데기가 없어서 끄는편이라고 함.
  experimental: {
    appDir: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
      },
      {
        protocol: 'https',
        hostname: 'image.tmdb.org',
      },
    ],
  },
};

module.exports = nextConfig;
