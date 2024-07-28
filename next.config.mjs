/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  publicRuntimeConfig: {
    hostname: process.env.BSHDRD_HOSTNAME || 'localhost',
    theme: process.env.BSHDRD_THEME || 'random',
    title: process.env.BSHDRD_TITLE || 'BSHDRD',
  },
  reactStrictMode: true,
};

export default nextConfig;
