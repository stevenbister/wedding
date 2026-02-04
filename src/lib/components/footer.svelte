<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';

	import { page } from '$app/state';
	import Flower1 from '../illustrations/flower-1.svelte';
	import DressSaveTheDate from '$lib/illustrations/dress-save-date.svelte';
	import Couple from '$lib/illustrations/couple.svelte';

	import { animations } from '$/constants/animations';

	onMount(() => {
		const tl = gsap.timeline({
			defaults: {
				duration: animations.drawDuration,
				ease: animations.ease
			},
			scrollTrigger: {
				trigger: 'footer',
				start: 'center bottom',
				once: true
			}
		});

		tl.set(['.flower-1', '.footer-illustration'], { opacity: 1 }).from(
			['.flower-1 path', '.footer-illustration path'],
			{
				drawSVG: 0
			}
		);
	});
</script>

<footer>
	<Flower1 />

	{#if !page.error}
		{#if page.route.id === '/(main)'}
			<Couple class="footer-illustration" />
		{:else}
			<DressSaveTheDate class="footer-illustration" />
		{/if}
	{/if}

	<Flower1 />
</footer>

<style>
	footer {
		position: relative;
		display: flex;
		justify-content: center;
		min-height: var(--size-px-12);
		padding-block: var(--size-px-7);

		:global(.footer-illustration) {
			--size: 150px;

			width: var(--size);
			height: var(--size);

			@media (min-width: 48rem) {
				--size: 200px;
			}
		}

		:global(.flower-1) {
			--flower-offset: -76px;

			position: absolute;
			top: 0;

			&:first-child {
				left: var(--flower-offset);
			}

			&:last-child {
				transform: scalex(-1);
				right: var(--flower-offset);
			}

			@media (min-width: 48rem) {
				--flower-offset: -100px;
			}

			@media (min-width: 80rem) {
				--flower-offset: -120px;
			}
		}

		:global(.flower-1),
		:global(.footer-illustration) {
			opacity: 0;
		}
	}
</style>
