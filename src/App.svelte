<style lang="scss">
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;

    h1 {
      text-transform: uppercase;
      font-family: lato;
      font-size: 2em;
      font-weight: 100;
    }

    @media (min-width: 640px) {
      max-width: none;
    }
  }
</style>

<script lang="ts">
  // import { orderBy } from 'lodash-es';
  let name: string = 'world';
  let subtextClassName = 'text-yellow-400';
  let headingClassName = 'text-red-400';

  if (window.location.pathname.match('widget.html')) {
    headingClassName = 'text-pink-400';
    subtextClassName = 'text-blue-400';
  }
  // console.log(orderBy([{a: 1000000, b: 2}, {a: 3, b: 2}, {a: -11, b: 2}, {a: 1111, b: 2}], 'a'));
</script>

<main>
  <h1 class={headingClassName}>Hello {name}!</h1>
  <p class={subtextClassName}>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>
</main>
