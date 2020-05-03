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
<Route path="/backend/" component={Index} />
<Route path="/backend/nested/doublenested/asd" component={NestedDoublenestedAsd} />
<Route path="/backend/nested/doublenested/" component={NestedDoublenestedIndex} />
<Route path="/backend/nested/" component={NestedIndex} />
<Route path="/backend/nested/site" component={NestedSite} />
<Route path="/backend/otherDir/" component={OtherdirIndex} />
</Router>
