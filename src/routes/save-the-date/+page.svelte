<script lang="ts">
	import SaveTheDate from '$lib/components/save-the-date.svelte';
	import Date from '$lib/components/date.svelte';
	import Head from '$/lib/components/head.svelte';
	import SaveTheDateButton from '$/lib/components/save-the-date-button.svelte';
	import { content } from '$/constants/content';
	import { venue } from '$/constants/venue';
	import Callout from '$/lib/components/callout.svelte';
</script>

<Head
	title={content.saveTheDate.title}
	image={{
		src: '/social/save-the-date.png',
		alt: content.saveTheDate.title
	}}
	description={content.social}
/>

<article class="container">
	<SaveTheDate />

	<Date />

	<section class="cta-section">
		<h2>{content.saveTheDate.ctaSection.heading}</h2>

		<div class="text-box">
			<p class="text-balance">{content.saveTheDate.ctaSection.description}</p>
			<p class="text-balance text-regular">{venue.address}</p>
		</div>

		<SaveTheDateButton />

		<Callout description={content.noKids} />
	</section>
</article>

<style>
	.cta-section {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--size-4);
		text-align: center;
		margin-block-start: var(--size-px-7);
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
	}

	.text-box {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--size-1);
	}
</style>
