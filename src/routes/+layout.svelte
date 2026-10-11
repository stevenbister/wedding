<script lang="ts">
	import type { LayoutProps } from './$types';
	import { onNavigate } from '$app/navigation';

	import Lily1 from '$lib/illustrations/lily-1.svelte';
	import Lily2 from '$lib/illustrations/lily-2.svelte';
	import Footer from '$/lib/components/footer.svelte';
	import NavBar from '$lib/components/navbar.svelte';
	import LoadingBar from '$lib/components/loading-bar.svelte';
	import { fadeIn } from '$lib/actions/fade-in';

	import '$styles/main.css';

	let { data, children }: LayoutProps = $props();

	onNavigate((navigation) => {
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<Lily1 />
<Lily2 />

<LoadingBar />

<NavBar inviteReady={data.inviteReady} />

<main use:fadeIn>
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
</style>
