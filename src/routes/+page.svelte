<script lang="ts">
	import type { ActionData } from './$types';
	import Head from '$/lib/components/head.svelte';
	import GuestSearch from '$/lib/components/guest-search-form.svelte';
	import SteveAndGrace from '$lib/components/steve-and-grace.svelte';

	import { content } from '$/constants/content';
	import Callout from '$/lib/components/callout.svelte';

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

	<div>
		<GuestSearch {form} />

		<Callout description={content.rsvp.contact} class="space-top-4" />
	</div>
</article>

<style>
	article {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--size-8);
	}
</style>
