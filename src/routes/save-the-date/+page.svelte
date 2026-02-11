<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';

	import SaveTheDate from '$lib/components/save-the-date.svelte';
	import Date from '$lib/components/date.svelte';
	import Head from '$/lib/components/head.svelte';
	import SaveTheDateButton from '$/lib/components/save-the-date-button.svelte';
	import { content } from '$/constants/content';
	import { venue } from '$/constants/venue';
	import { animations } from '$/constants/animations';
	import Callout from '$/lib/components/callout.svelte';

	onMount(() => {
		// TODO: Only run this on the first page load. After that, navigation/going back should not run the animations
		const tl = gsap.timeline({
			defaults: {
				duration: 1.5,
				ease: animations.ease
			}
		});

		tl.set(['.lily-1', '.lily-2', '#circle'], {
			opacity: 1
		})
			.from(['.lily-1 path', '.lily-2 path'], { drawSVG: 0, duration: animations.drawDuration })
			.to(
				['article', '.navbar'],
				{
					opacity: 1
				},
				'<'
			)
			.from(
				'#circle path',
				{
					drawSVG: 0
				},
				'-=3'
			);
	});
</script>

<Head
	title={content.saveTheDate.title}
	image={{
		src: '/social/save-the-date.png',
		alt: 'Save the date'
	}}
	description={`${content.saveTheDate.ctaSection.heading} ${content.saveTheDate.ctaSection.description}`}
/>

<article class="container">
	<SaveTheDate />

	<Date />

	<section class="cta-section">
		<h2>{content.saveTheDate.ctaSection.heading}</h2>

		<div class="text-box">
			<p class="text-balance">{content.saveTheDate.ctaSection.description}</p>
			<p class="text-balance">{venue.address}</p>
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

		@media (min-width: 48rem) {
			margin-block-start: var(--size-px-10);
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

	article,
	:global(.navbar),
	:global(.lily-1),
	:global(.lily-2),
	:global(#circle) {
		opacity: 0;
	}
</style>
