<script lang="ts">
	import { page } from '$app/state';

	import Flower1 from '$lib/illustrations/flower-1.svelte';
	import DressSaveTheDate from '$lib/illustrations/dress-save-date.svelte';
	import Couple from '$lib/illustrations/couple.svelte';
	import Groomsmen from '$lib/illustrations/groomsmen.svelte';
	import Cheers from '$lib/illustrations/cheers.svelte';
</script>

<footer>
	<Flower1 />

	{#if !page.error}
		{#if page.route.id === '/' || page.route.id === '/rsvp/[guestId]'}
			<Couple />
		{:else if page.route.id === '/venue'}
			<Cheers />
		{:else if page.route.id === '/info'}
			<Groomsmen />
		{:else}
			<DressSaveTheDate />
		{/if}
	{/if}

	<Flower1 />
</footer>

<style>
	footer {
		position: relative;
		display: flex;
		justify-content: center;
		padding-block: var(--size-px-7);

		@media (min-width: 48rem) {
			padding-block-start: var(--size-px-10);
		}

		@media (min-width: 80rem) {
			padding-block-start: var(--size-px-12);
		}

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
			bottom: 0;

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
	}
</style>
