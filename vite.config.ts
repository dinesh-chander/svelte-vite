/**
 * Babel will compile modern JavaScript down to a format compatible with older browsers, but it will also increase your
 * final bundle size and build speed. Edit the `browserslist` property in the package.json file to define which
 * browsers Babel should target.
 *
 * Browserslist documentation: https://github.com/browserslist/browserslist#browserslist-
 */
const useBabel = true;

/**
 * Change this to `true` to generate source maps alongside your production bundle. This is useful for debugging, but
 * will increase total bundle size and expose your source code.
 */
const sourceMapsInProduction = false;

/*********************************************************************************************************************/
/**********                                              Vite                                               **********/
/*********************************************************************************************************************/

import { svelte } from '@sveltejs/vite-plugin-svelte';
import legacy from '@vitejs/plugin-legacy';
import { resolve } from 'path';
import { visualizer as bundleVisualizerPlugin } from 'rollup-plugin-visualizer';
import autoPreprocess from 'svelte-preprocess';
import { defineConfig, UserConfig } from 'vite';
import AsyncCatch from 'vite-plugin-async-catch';
import viteCompression from 'vite-plugin-compression';
import { minifyHtml } from 'vite-plugin-html';
import { viteSingleFile } from 'vite-plugin-singlefile';
import { ViteWebfontDownload } from 'vite-plugin-webfont-dl';
import tsconfigPaths from 'vite-tsconfig-paths';
import pkg from './package.json';
import postcss from './postcss.config';

const production = process.env.NODE_ENV === 'production';

const rootDir = resolve(__dirname, 'src');

const config = <UserConfig>defineConfig({
  root: rootDir,
  resolve: {
    alias: {
      '@': rootDir
    }
  },
  plugins: [
    tsconfigPaths({
      projects: [resolve(__dirname, '.')]
    }),
    AsyncCatch({
      catchCode: `console.error(e)`
    }),
    ViteWebfontDownload(['https://fonts.googleapis.com/css2?family=Lato&display=swap']),
    svelte({
      emitCss: true,
      preprocess: autoPreprocess(),
      compilerOptions: {
        dev: !production
      },
      // @ts-ignore This is temporary until the type definitions are fixed!
      hot: !production
    }),
    viteSingleFile(),
    minifyHtml(),
    viteCompression()
  ],
  build: {
    sourcemap: sourceMapsInProduction,
    // cssCodeSplit: false, this prevents injection of css code in html file
    assetsInlineLimit: 10000000000,
    rollupOptions: {
      makeAbsoluteExternalsRelative: false,
      input: [resolve(__dirname, 'src/templates/index.html')],
      output: {
        manualChunks: undefined
      },
      plugins: [bundleVisualizerPlugin()]
    },
    emptyOutDir: true,
    outDir: resolve(__dirname, 'dist')
  },
  css: {
    postcss
  }
});

// Babel
if (useBabel) {
  config.plugins.unshift(
    legacy({
      targets: pkg.browserslist
    })
  );
}

export default config;
