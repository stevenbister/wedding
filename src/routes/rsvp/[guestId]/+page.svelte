<script lang="ts">
	import type { PageProps } from './$types';
	import Head from '$/lib/components/head.svelte';
	import RSVP from '$/lib/components/rsvp-form.svelte';
	import { content } from '$/constants/content';
	import { brand } from '$/constants/brand';

	let { data, form }: PageProps = $props();
</script>

<Head
	title={`RSVP for ${data.guest.firstName}`}
	image={{
		src: '/social/steve-and-grace-get-married.png',
		alt: brand.name
	}}
	description={content.social}
/>

<article class="container narrow">
	<header>
		<h1 class="serif">{content.rsvp.title}</h1>
		<h2>by {content.rsvp.deadline}</h2>
	</header>

	<RSVP {data} {form} />
</article>

<style>
	header {
		text-align: center;
		font-size: var(--font-size-4);
		margin-block: var(--size-px-4);
	}

	h1 {
		font-size: var(--font-size-8);
		text-align: center;
	}

	h2 {
		font-size: var(--font-size-5);
	}
</style>
