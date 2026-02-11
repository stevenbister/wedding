<script lang="ts">
	import { content } from '$/constants/content';
	import { venue } from '$/constants/venue';

	import Head from '$/lib/components/head.svelte';
</script>

<Head
	title={content.venue.title}
	image={{
		src: '/social/steve-and-grace-get-married.png',
		alt: content.rsvp.title
	}}
	description={content.social}
/>

<article class="container">
	<h1>{content.venue.title}</h1>

	<div>
		<p class="ta-center text-balance">{venue.address}</p>

		<iframe
			title={venue.address}
			src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1139.6633555910755!2d-1.086829322441922!3d52.24136161186187!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487716c50f216a01%3A0x5b02fd4a475112b7!2sDodmoor%20House!5e0!3m2!1sen!2suk!4v1770826904300!5m2!1sen!2suk"
			width="600"
			height="450"
			style="border:0;"
			loading="lazy"
			referrerpolicy="no-referrer-when-downgrade"
		></iframe>
	</div>
</article>

<style>
	h1 {
		text-align: center;
		margin-block: var(--size-px-4);
	}

	div {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--size-4);
	}

	iframe {
		width: 100%;
		height: auto;
		aspect-ratio: var(--ratio-square);

		@media (min-width: 48rem) {
			aspect-ratio: var(--ratio-widescreen);
		}
	}
</style>
