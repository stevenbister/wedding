<script lang="ts">
	import Lily1 from '$lib/illustrations/lily-1.svelte';
	import Lily2 from '$lib/illustrations/lily-2.svelte';
	import Header from '$/lib/components/header.svelte';
	import favicon from '$lib/assets/favicon.svg';
	import Footer from '$/lib/components/footer.svelte';

	import '$styles/main.css';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Lily1 />
<Lily2 />
<Header />

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
		right: -46px;

		@media (min-width: 36rem) {
			top: -95px;
			right: -95px;
		}
	}
</style>
