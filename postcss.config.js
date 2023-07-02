import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import postcssImport from 'postcss-import';
import tailwindPlugin from './tailwind.config.js';

const production = process.env.NODE_ENV === "production";

const plugins = [
  postcssImport(),
  tailwindPlugin,
  autoprefixer,
];

if (production) {
  plugins.push(cssnano({
    preset: ['advanced', {
      discardComments: { removeAll: true },
      normalizeWhitespace: true,
      discardEmpty: true,
      mergeRules: true,
      minifySelectors: true,
      minifyFontValues: true,
      colormin: true,
      convertValues: true,
      discardUnused: true,
      reduceInitial: true,
      zindex: true,
      reduceIdents: true,
      svgo: true,
      calc: true,
      minifyParams: true,
      discardDuplicates: true,
    }]
  }));
};

const postcssConfig = {
  plugins
};

export default postcssConfig;