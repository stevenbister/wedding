<script lang="ts">
	import type { PageProps } from './$types';
	import Head from '$/lib/components/head.svelte';
	import RSVP from '$/lib/components/rsvp-form.svelte';
	import SteveAndGrace from '$lib/components/steve-and-grace.svelte';
	import { content } from '$/constants/content';

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
	<SteveAndGrace />

	<RSVP {data} {form} />
</article>

<style>
	article {
		display: flex;
		flex-direction: column;
		gap: var(--size-8);
	}
</style>
