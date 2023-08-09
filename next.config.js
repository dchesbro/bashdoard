/** @type {import('next').NextConfig} */
module.exports = {
  output: 'standalone',
  publicRuntimeConfig: {
    hostname: process.env.BASHDOARD_HOSTNAME,
    theme: process.env.BASHDOARD_THEME,
    title: process.env.BASHDOARD_TITLE,
  },
}
