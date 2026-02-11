<script lang="ts">
	import { content } from '$/constants/content';
	import Head from '$/lib/components/head.svelte';
	import Accordion from '$/lib/components/accordion.svelte';

	// TODO: Need to add img & desc to the Head
</script>

<Head
	title={content.info.title}
	image={{
		src: '/social/save-the-date.png',
		alt: 'Save the date'
	}}
	description=""
/>

<article class="container">
	<h1>{content.info.title}</h1>

	<Accordion name="info" items={content.info.faqs} />
</article>

<style>
	h1 {
		text-align: center;
		margin-block-start: var(--size-px-4);
	}
</style>
