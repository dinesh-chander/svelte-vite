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
import { fileURLToPath } from 'node:url';
import legacy from '@vitejs/plugin-legacy';
import { visualizer as bundleVisualizerPlugin } from 'rollup-plugin-visualizer';
import autoPreprocess from 'svelte-preprocess';
import { defineConfig } from 'vite';
import AsyncCatch from 'vite-plugin-async-catch';
import viteCompression from 'vite-plugin-compression';
import { createHtmlPlugin } from 'vite-plugin-html';
import { viteSingleFile } from 'vite-plugin-singlefile';
import { ViteWebfontDownload } from 'vite-plugin-webfont-dl';
import tsconfigPaths from 'vite-tsconfig-paths';
import pkg from './package.json';
import path from 'path';
import postcss from './postcss.config';
import vitePluginHtmlEnv from 'vite-plugin-html-env';
import { sync } from 'glob';

const production = process.env.NODE_ENV === 'production';

const getAbsPath = (pattern) => {
  const fullPath = fileURLToPath(new URL(pattern, import.meta.url));
  return fullPath;
};

const rootDir = getAbsPath('src');

const inputFiles = sync(getAbsPath(production ? 'src/index.html' : 'src/**/*.html'));

const getInputPathObject = (paths) => {
  const pathObject = {};
  paths.forEach((filePath) => {
    const fileName = path.parse(filePath).name;
    pathObject[fileName] = filePath;
  });

  return pathObject;
};

const config = defineConfig({
  root: rootDir,
  resolve: {
    alias: {
      '@': rootDir
    }
  },
  plugins: [
    vitePluginHtmlEnv(),
    tsconfigPaths({
      projects: [getAbsPath('.')]
    }),
    AsyncCatch.default({
      catchCode: `console.error(e)`
    }),
    ViteWebfontDownload(['https://fonts.googleapis.com/css2?family=Lato&display=swap']),
    svelte({
      emitCss: true,
      preprocess: autoPreprocess(),
      compilerOptions: {
        dev: !production
      },
      hot: !production
    }),
    viteSingleFile({
      removeViteModuleLoader: true
    }),
    createHtmlPlugin(),
    viteCompression()
  ],
  build: {
    sourcemap: sourceMapsInProduction,
    assetsInlineLimit: 10000000000,
    // cssCodeSplit: false, this prevents injection of css code in html file
    rollupOptions: {
      makeAbsoluteExternalsRelative: false,
      input: getInputPathObject(inputFiles),
      output: {
        manualChunks: undefined,
        compact: true
      },
      plugins: [
        bundleVisualizerPlugin({
          filename: `stats/${path.parse(inputFiles[0]).base}-stats.html`
        })
      ]
    },
    emptyOutDir: false,
    outDir: getAbsPath('dist')
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
