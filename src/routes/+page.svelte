<script lang="ts">
	import type { ActionData } from './$types';
	import Head from '$/lib/components/head.svelte';
	import GuestSearch from '$/lib/components/guest-search-form.svelte';
	import SteveAndGrace from '$lib/components/steve-and-grace.svelte';

	// TODO: Need to add img & desc to the Head

	let { form }: { form: ActionData } = $props();
</script>

<Head
	title="RSVP"
	image={{
		src: '/social/save-the-date.png',
		alt: 'Save the date'
	}}
	description=""
/>

<article class="container">
	<SteveAndGrace />

	<GuestSearch {form} />
</article>

<style>
	article {
		display: flex;
		flex-direction: column;
		gap: var(--size-8);
	}
</style>
