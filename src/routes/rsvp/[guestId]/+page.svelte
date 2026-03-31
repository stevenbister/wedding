<script lang="ts">
	import type { PageProps } from './$types';
	import Head from '$/lib/components/head.svelte';
	import RSVP from '$/lib/components/rsvp-form.svelte';
	import SteveAndGrace from '$lib/components/steve-and-grace.svelte';
	import { content } from '$/constants/content';
	import { details } from '$/constants/details';

	let { data, form }: PageProps = $props();
</script>

<Head
	title={`RSVP for ${data.guest.firstName}`}
	image={{
		src: '/social/steve-and-grace-get-married.png',
		alt: content.rsvp.title
	}}
	description={content.social}
/>

<article class="container narrow">
	<header class="space-top-7">
		<p>{details.date}</p>
		<SteveAndGrace />
	</header>

	<RSVP {data} {form} />
</article>

<style>
	article {
		display: flex;
		flex-direction: column;
		gap: var(--size-7);
	}

	header {
		text-align: center;
		font-size: var(--font-size-4);
	}
</style>
