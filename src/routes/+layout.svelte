<script lang="ts">
	import { onMount } from 'svelte';
	import { onNavigate } from '$app/navigation';
	import { gsap } from 'gsap';

	import Lily1 from '$lib/illustrations/lily-1.svelte';
	import Lily2 from '$lib/illustrations/lily-2.svelte';
	import Footer from '$/lib/components/footer.svelte';
	import NavBar from '$lib/components/navbar.svelte';
	import LoadingBar from '$lib/components/loading-bar.svelte';

	import { animations } from '$/constants/animations';

	import '$styles/main.css';

	let { children } = $props();

	onNavigate((navigation) => {
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});

	onMount(() => {
		const tl = gsap.timeline({
			defaults: {
				duration: 1.5,
				ease: animations.ease
			}
		});

		tl.set(['.draw', '#circle'], {
			opacity: 1
		})
			.from(['.draw path'], { drawSVG: 0, duration: animations.drawDuration })
			.to(
				['main', '.navbar'],
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

<Lily1 />
<Lily2 />

<LoadingBar />

<NavBar />

<main>
	{@render children()}
</main>

<Footer />

<style>
	main {
		flex: 1 0 auto;
	}

	:global(.lily-1),
	:global(.lily-2) {
		position: absolute;
	}

	:global(.lily-1) {
		top: -40px;
		left: -75px;

		@media (min-width: 36rem) {
			top: -90px;
			left: -30px;
		}

		@media (min-width: 80rem) {
			top: -135px;
			left: -55px;
		}
	}

	:global(.lily-2) {
		top: -36px;
		right: -60px;

		@media (min-width: 36rem) {
			top: -95px;
			right: -95px;
		}
	}

	main,
	:global(.navbar),
	:global(.draw) {
		opacity: 0;
	}
</style>
