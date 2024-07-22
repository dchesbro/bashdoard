/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  publicRuntimeConfig: {
    hostname: process.env.BSHDRD_HOSTNAME,
    theme: process.env.BSHDRD_THEME,
    title: process.env.BSHDRD_TITLE,
  },
  reactStrictMode: true,
};

export default nextConfig;
