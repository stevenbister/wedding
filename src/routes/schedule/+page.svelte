<script lang="ts">
	import { content } from '$/constants/content';
	import Head from '$/lib/components/head.svelte';
</script>

<Head
	title={content.schedule.title}
	image={{
		src: '/social/steve-and-grace-get-married.png',
		alt: content.rsvp.title
	}}
	description={content.social}
/>

<h1>{content.schedule.title}</h1>

<style>
	h1 {
		text-align: center;
		margin-block-start: var(--size-px-4);
	}
</style>
