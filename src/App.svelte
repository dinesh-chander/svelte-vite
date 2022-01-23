<style lang="scss">
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;

    h1 {
      color: #ff3e00;
      text-transform: uppercase;
      font-family: lato;
      font-size: 4em;
      font-weight: 100;
    }

    @media (min-width: 640px) {
      max-width: none;
    }
  }
</style>

<script lang="ts">
  import { orderBy } from 'lodash-es';
  let name: string = 'world';
  console.log(orderBy([{a: 1000000, b: 2}, {a: 3, b: 2}, {a: -11, b: 2}, {a: 1111, b: 2}], 'a'));
</script>

<main class="bg-green-100">
  <h1>Hello {name}!</h1>
  <p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>
</main>
