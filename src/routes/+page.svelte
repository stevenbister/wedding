<script lang="ts">
	import type { ActionData } from './$types';
	import Head from '$/lib/components/head.svelte';
	import GuestSearch from '$/lib/components/guest-search-form.svelte';
	import SteveAndGrace from '$lib/components/steve-and-grace.svelte';

	import { content } from '$/constants/content';
	import { details } from '$/constants/details';
	import Callout from '$/lib/components/callout.svelte';

	let { form }: { form: ActionData } = $props();
</script>

<Head
	title="Steve and Grace get married!"
	image={{
		src: '/social/steve-and-grace-get-married.png',
		alt: content.rsvp.title
	}}
	description={content.social}
/>

<article class="container">
	<header class="space-top-7">
		<p>{details.date}</p>
		<SteveAndGrace />
	</header>

	<section>
		<GuestSearch {form} />

		<Callout description={content.rsvp.contact} class="space-top-4" />
	</section>
</article>

<style>
	article {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--size-8);
	}

	header {
		text-align: center;
		font-size: var(--font-size-4);
	}
</style>
