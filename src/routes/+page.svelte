<script lang="ts">
	import Head from '$/lib/components/head.svelte';
	import SteveAndGrace from '$lib/components/steve-and-grace.svelte';
	import Date from '$lib/components/date.svelte';
	import { content } from '$/constants/content';
	import { details } from '$/constants/details';
	import RSVPButton from '$/lib/components/rsvp-button.svelte';
	import { brand } from '$/constants/brand';
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

	<Date />

	<section class="cta-section">
		<div class="text-box">
			<p class="text-balance text-regular">{content.rsvp.invite}</p>
			<p class="text-balance text-regular">{details.venue.address}</p>

			<p class="cursive">{content.rsvp.receptionToFollow}</p>
		</div>

		<RSVPButton />
	</section>
</article>

<style>
	header {
		text-align: center;
		font-size: var(--font-size-4);
		margin-block-end: var(--size-px-6);
	}

	.cta-section {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--size-4);
		text-align: center;
		margin-block-start: var(--size-px-6);
		font-weight: var(--font-weight-3);

		@media (min-width: 48rem) {
			margin-block-start: var(--size-px-7);
		}

		p {
			max-width: 40ch;

			@media (min-width: 48rem) {
				max-width: 60ch;
			}
		}

		p[class*='cursive'] {
			font-size: var(--font-size-5);
		}
	}

	.text-box {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--size-1);
	}
</style>
