import vue from '@vitejs/plugin-vue';
import { defineConfig, loadEnv } from 'vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import createSvgSpritePlugin from 'vite-plugin-svg-sprite';

// https://vitejs.dev/config/
export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return defineConfig({
    base: '/audit',
    define: {
      'process.env': JSON.parse(JSON.stringify(env)
      .replaceAll('VITE_', 'VUE_APP_')),
    },
    server: {
      host: true,
      port: 8080,
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "./src/app/css/main.scss";`,
        },
      },
    },
    resolve: {
      // deduping compat is needed for audit form to prevent vue instance duplicating
      dedupe: ['vue', '@vue/compat'],
      alias: {
        vue: '@vue/compat',
      },
    },
    plugins: [
      vue({
        template: {
          compilerOptions: {
            compatConfig: {
              MODE: 2,
            },
          },
        },
      }),
      // https://www.npmjs.com/package/vite-plugin-node-polyfills
      nodePolyfills({
        // are needed for csv-parse
        include: ['buffer', 'stream', 'process'],
        globals: {
          Buffer: true, // can also be 'build', 'dev', or false
          process: true, // csv stringify
        },
      }),
      createSvgSpritePlugin({
        include: '**/sprite/*.svg',
      }),
    ],
    test: {
      globals: true,
      coverage: {
        enabled: true,
        reporter: 'json',
      },
      environment: 'happy-dom',
      setupFiles: ['./tests/config/config.js'],
    },
  });
}
