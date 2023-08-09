/** @type {import('next').NextConfig} */
module.exports = {
  output: 'standalone',
  publicRuntimeConfig: {
    hostname: process.env.BASHDOARD_HOSTNAME ?? 'localhost',
    theme: process.env.BASHDOARD_THEME ?? 'random',
    title: process.env.BASHDOARD_TITLE ?? 'BSHDRD',
  },
}
