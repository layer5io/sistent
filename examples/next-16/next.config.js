const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  turbopack: {},
  outputFileTracingRoot: path.join(__dirname, '../..')
};

module.exports = nextConfig;
