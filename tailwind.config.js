import tailwindcss from 'tailwindcss';

const tailwindPlugin = tailwindcss({
  mode: 'jit',
  content: [
    "./src/**/*.html",
    "./src/**/*.{svelte,ts}",
  ],
  theme: {
    extend: {},
  },
  plugins: []
});

export default tailwindPlugin;
