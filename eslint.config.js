// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');

module.exports = defineConfig([
  expoConfig,
  {
    // dist/ es la salida de la build y .expo/ son los tipos que genera Expo:
    // el lint revisa el código que escribimos, no lo que producen las
    // herramientas.
    ignores: ['dist/*', '.expo/*'],
  },
]);
