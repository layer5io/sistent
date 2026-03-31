const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Next.js 15 always merges `@mui/material` and `@mui/icons-material` into
  // `experimental.optimizePackageImports` (see next/dist/server/config.js). That forces them into
  // `transpilePackages`, so they go through SWC + React Refresh in dev. React Refresh injects
  // `import.meta.webpackHot` but only rewrites to `module.hot` for `*.cjs`; MUI uses `*.js` → parse
  // error. Only `@mui/material` and `@mui/system` need this bypass. Do **not** match
  // `@mui/icons-material`: treating those as `javascript/auto` breaks CJS default-export interop and
  // React will render icon imports as plain objects ("Element type is invalid ... got: object").
  webpack: (config, { dev }) => {
    if (!dev) return config;
    const rules = config.module.rules;
    const oneOfRule = rules.find((r) => r && Array.isArray(r.oneOf));
    if (oneOfRule) {
      oneOfRule.oneOf.unshift({
        test: /\.[cm]?js$/,
        include: /node_modules[\\/]@mui[\\/](material|system)(?:[\\/]|$)/,
        type: 'javascript/auto',
        resolve: { fullySpecified: false }
      });
    }
    return config;
  },
  outputFileTracingRoot: path.join(__dirname, '../..')
};

module.exports = nextConfig;
