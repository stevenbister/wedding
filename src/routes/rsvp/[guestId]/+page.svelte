<script lang="ts">
	import type { PageProps } from './$types';
	import Head from '$/lib/components/head.svelte';
	import RSVP from '$/lib/components/rsvp-form.svelte';
	import SteveAndGrace from '$lib/components/steve-and-grace.svelte';

	// TODO: Need to add img & desc to the Head

	let { data, form }: PageProps = $props();
</script>

<Head
	title="RSVP"
	image={{
		src: '/social/save-the-date.png',
		alt: 'Save the date'
	}}
	description=""
/>

<article class="container narrow">
	<SteveAndGrace />

	<RSVP
		guest={{
			guest: data.guest,
			partner: data.partner
		}}
		{form}
	/>
</article>

<style>
	article {
		display: flex;
		flex-direction: column;
		gap: var(--size-8);
	}
</style>
