<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';

	import SaveTheDate from '$lib/components/save-the-date.svelte';
	import Date from '$lib/components/date.svelte';
	import { buildMetaTitle } from '$/lib/utils/meta';
	import { content } from '$/constants/content';
	import { animations } from '$/constants/animations';

	onMount(() => {
		const tl = gsap.timeline({
			defaults: {
				duration: 1.5,
				ease: animations.ease
			}
		});

		tl.from(['.lily-1 path', '.lily-2 path'], { drawSVG: 0, duration: animations.drawDuration })
			.from(
				'article',
				{
					opacity: 0
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

<svelte:head>
	<title>{buildMetaTitle(content.saveTheDate.title)}</title>
</svelte:head>

<article class="container">
	<SaveTheDate />

	<Date />

	<section class="cta-section">
		<h2>{content.saveTheDate.ctaSection.heading}</h2>

		<p class="space-top-1">{content.saveTheDate.ctaSection.description}</p>

		<button class="btn space-top-2" onclick={(e) => console.log(e)}
			>{content.saveTheDate.ctaSection.cta}</button
		>
	</section>
</article>

<style>
	.cta-section {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		margin-block-start: var(--size-px-7);

		@media (min-width: 48rem) {
			margin-block-start: var(--size-px-10);
		}

		p {
			max-width: 24ch;

			@media (min-width: 48rem) {
				max-width: 36ch;
			}
		}

		.btn {
			margin-inline: auto;
		}
	}
</style>
