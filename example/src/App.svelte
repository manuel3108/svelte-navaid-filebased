<script>
	export let name;

	import Routes from './Routes.svelte'
	import Link from 'svelte-navaid/Link.svelte';
</script>

<Link href="/">Home</Link>
<Link href="/nested/">nested</Link>
<Link href="/nested/site/">nested/site</Link>
<Link href="/nested/doublenested/">nested/doublenested</Link>
<Link href="/nested/doublenested/asd/">nested/doublenested/asd</Link>
<Link href="/otherdir/">otherdir</Link>



<main>
	<h1>Hello {name}!</h1>
	<p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>

	<Routes />
</main>
