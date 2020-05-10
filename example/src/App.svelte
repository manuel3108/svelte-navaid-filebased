<script>
	export let name;

	import Routes from './Routes.svelte'
</script>

<a href="/">Home</a>
<a href="/pages/">Pages</a>
<a href="/foo/">Foo</a>
<a href="/nested/">nested</a>
<a href="/nested/site/">nested/site</a>
<a href="/nested/doublenested/">nested/doublenested</a>
<a href="/nested/doublenested/asd/">nested/doublenested/asd</a>
<a href="/otherdir/">otherdir</a>

<main>
	<h1>Hello {name}!</h1>
	<p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>

	<Routes />
</main>
