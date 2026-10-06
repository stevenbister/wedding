<script lang="ts">
	import { brand } from '$/constants/brand';
	import { content } from '$/constants/content';
	import Head from '$/lib/components/head.svelte';
	import Timeline from '$/lib/components/timeline.svelte';
</script>

<Head
	title={content.schedule.title}
	image={{
		src: '/social/steve-and-grace-get-married.png',
		alt: brand.name
	}}
	description={content.social}
/>

<h1>{content.schedule.title}</h1>

<div class="container space-top-7">
	<Timeline />
</div>

<style>
	h1 {
		text-align: center;
		margin-block-start: var(--size-px-4);
	}
</style>
