<script lang="ts">
	import NavBar from '$lib/components/navbar.svelte';

	let { children } = $props();
</script>

<NavBar />
{@render children()}
