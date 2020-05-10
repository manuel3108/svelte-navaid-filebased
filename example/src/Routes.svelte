<script>
	import Navaid from 'navaid';
	import { onDestroy } from 'svelte';
	import Foo from './routes/foo.svelte'
	import Index from './routes/index.svelte'
	import NestedDoublenestedAsd from './routes/nested/doublenested/asd.svelte'
	import NestedDoublenestedIndex from './routes/nested/doublenested/index.svelte'
	import NestedIndex from './routes/nested/index.svelte'
	import NestedSite from './routes/nested/site.svelte'
	import OtherdirIndex from './routes/otherDir/index.svelte'
	import PagesEditPageid from './routes/pages/edit/[pageid].svelte'
	import PagesIndex from './routes/pages/index.svelte'
	let Route;
	let params=undefined
	let uri = location.pathname;

	function track(obj) {
		uri = obj.state || obj.uri || location.pathname;
		if (window.ga) ga.send('pageview', { dp:uri });
	}

	addEventListener('replacestate', track);
	addEventListener('pushstate', track);
	addEventListener('popstate', track);

	const router = Navaid('/')
		.on('/foo', () => {params = undefined; Route = Foo;})
		.on('/', () => {params = undefined; Route = Index;})
		.on('/nested/doublenested/asd', () => {params = undefined; Route = NestedDoublenestedAsd;})
		.on('/nested/doublenested/', () => {params = undefined; Route = NestedDoublenestedIndex;})
		.on('/nested/', () => {params = undefined; Route = NestedIndex;})
		.on('/nested/site', () => {params = undefined; Route = NestedSite;})
		.on('/otherDir/', () => {params = undefined; Route = OtherdirIndex;})
		.on('/pages/edit/:pageid', (obj) => {params = obj; Route = PagesEditPageid;})
		.on('/pages/', () => {params = undefined; Route = PagesIndex;})
		.listen();
	onDestroy(router.unlisten);
</script>

{#if params === undefined}
	<svelte:component this={Route}/>
{:else}
	<svelte:component this={Route} {params} />
{/if}