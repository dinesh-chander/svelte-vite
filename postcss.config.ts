import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import postcssImport from 'postcss-import';
import tailwindPlugin from './tailwind.config';

const production = process.env.NODE_ENV === "production";

const plugins = [
  postcssImport,
  tailwindPlugin,
  autoprefixer,
];

if (production) {
  plugins.push(cssnano());
};

const postcssConfig = {
  plugins
};

export default postcssConfig;