<script lang="ts">
	import { content } from '$/constants/content';
	import Head from '$/lib/components/head.svelte';

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

<h1>{content.info.title}</h1>

<style>
	h1 {
		text-align: center;
		margin-block-start: var(--size-px-4);
	}
</style>
