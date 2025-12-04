/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/nextjs-tictactoe-lab6-10',
  assetPrefix: '/nextjs-tictactoe-lab6-10/',
}

module.exports = nextConfig
