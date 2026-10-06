<script lang="ts">
	import type { ActionData } from './$types';
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import Head from '$/lib/components/head.svelte';
	import GuestSearch from '$/lib/components/guest-search-form.svelte';
	import SteveAndGrace from '$lib/components/steve-and-grace.svelte';
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
		<SteveAndGrace />
	</header>

	<section>
		<GuestSearch {form} />

		<Callout description={content.rsvp.contact} class="space-top-4" />
	</section>
</article>

<style>
	header {
		display: flex;
		flex-direction: column;
		gap: var(--size-px-3);
		text-align: center;
		font-size: var(--font-size-4);
		margin-block-end: var(--size-px-6);
	}
</style>
