import million from 'million/compiler';

const API_URL = process.env.API_URL;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    relay: {
      // ...
      // Configuration options accepted by the `relay-compiler` command-line tool and `babel-plugin-relay`.
      src: './components',
      schema: './schema.graphql',
      language: 'javascript',
      excludes: ['**/node_modules/**', '**/__mocks__/**', '**/__generated__/**'],
    },
  },
  async rewrites() {
    return [
      { source: '/api/:path*', destination: `${API_URL}/:path*` },
      { source: '/user/:path*', destination: `${API_URL}/:path*` },
      { source: '/provider/:path*', destination: '/:path*' },
    ];
  },
  async headers() {
    return [
      {
        // matching all API routes
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' }, // replace this your actual origin
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET,DELETE,PATCH,POST,PUT',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value:
              'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
          },
        ],
      },
    ];
  },
};

const millionConfig = {
  auto: {
    threshold: 0.05, // default: 0.1,
    skip: ['useBadHook', /badVariable/g], // default []
    // if you're using RSC: auto: { rsc: true },
  },
};

export default nextConfig;
