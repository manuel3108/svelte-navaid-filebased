<script>
    import { onMount } from 'svelte';

    export let params;

    onMount(() => {
        console.log("onmount", params)
    })
</script>

this is the page edit/pageid with the params: <br>
{JSON.stringify(params)}