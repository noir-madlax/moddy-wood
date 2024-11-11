/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['您的图片域名'], // 如果使用外部图片，需要添加域名
  },
}

module.exports = nextConfig
