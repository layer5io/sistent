// relay.config.js
module.exports = {
  // ...
  // Configuration options accepted by the `relay-compiler` command-line tool and `babel-plugin-relay`.
  src: './components',
  schema: './schema.graphql',
  language: 'javascript',
  excludes: ['**/node_modules/**', '**/__mocks__/**', '**/__generated__/**'],
};
