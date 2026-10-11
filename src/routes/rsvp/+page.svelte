<script lang="ts">
	import type { ActionData } from './$types';
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import Head from '$/lib/components/head.svelte';
	import GuestSearch from '$/lib/components/guest-search-form.svelte';
	import { content } from '$/constants/content';
	import Callout from '$/lib/components/callout.svelte';
	import { brand } from '$/constants/brand';

	let { form }: { form: ActionData } = $props();

	$effect(() => {
		if (!sessionStorage.getItem('guest-id')) return;

		goto(
			resolve(`/rsvp/[guestId]`, {
				guestId: sessionStorage.getItem('guest-id')!
			})
		);
	});
</script>

<Head
	title={brand.name}
	image={{
		src: '/social/steve-and-grace-get-married.png',
		alt: brand.name
	}}
	description={content.social}
/>

<article class="container">
	<header>
		<h1 class="serif">{content.rsvp.title}</h1>
		<h2>by {content.rsvp.deadline}</h2>
	</header>

	<section>
		<GuestSearch {form} />

		<Callout description={content.rsvp.contact} class="space-top-4" />
	</section>
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
