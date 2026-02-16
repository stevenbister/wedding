<script lang="ts">
	import { content } from '$/constants/content';
	import Head from '$/lib/components/head.svelte';
	import Accordion from '$/lib/components/accordion.svelte';
</script>

<Head
	title={content.info.title}
	image={{
		src: '/social/steve-and-grace-get-married.png',
		alt: content.rsvp.title
	}}
	description={content.social}
/>

<article class="container narrow">
	<h1>{content.info.title}</h1>

	<Accordion name="info" items={content.info.faqs} />
</article>

<style>
	h1 {
		text-align: center;
		margin-block-start: var(--size-px-4);
	}
</style>
