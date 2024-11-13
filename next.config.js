/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['您的图片域名'],
  },
  experimental: {
    optimizeFonts: true,
  },
}

module.exports = nextConfig
