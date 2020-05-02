<script>
import Router from 'svelte-navaid/Router.svelte';
import Route from 'svelte-navaid/Route.svelte';
import Index from './routes/index.svelte'
import NestedDoublenestedAsd from './routes/nested/doublenested/asd.svelte'
import NestedDoublenestedIndex from './routes/nested/doublenested/index.svelte'
import NestedIndex from './routes/nested/index.svelte'
import NestedSite from './routes/nested/site.svelte'
import OtherdirIndex from './routes/otherDir/index.svelte'
</script>
<Router>
<Route path="/" component={Index} />
<Route path="/nested/doublenested/asd" component={NestedDoublenestedAsd} />
<Route path="/nested/doublenested/" component={NestedDoublenestedIndex} />
<Route path="/nested/" component={NestedIndex} />
<Route path="/nested/site" component={NestedSite} />
<Route path="/otherDir/" component={OtherdirIndex} />
</Router>
