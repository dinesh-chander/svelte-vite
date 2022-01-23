import tailwind from 'tailwindcss';

export default tailwind({
  mode: 'jit',
  content: [
    "./index.html",
    "./src/**/*.{svelte,ts}",
  ],
  theme: {
    extend: {},
  },
  plugins: []
});
