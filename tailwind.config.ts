import tailwind from 'tailwindcss';

export default tailwind({
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
