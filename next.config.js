/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: { 
    BING_COOKIE: process.env.BING_COOKIE,
    BING_VARIANT: process.env.BING_VARIANT
  }
}

module.exports = nextConfig
