/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["img1.baidu.com","rb.gy"]
  }
}

module.exports = nextConfig
