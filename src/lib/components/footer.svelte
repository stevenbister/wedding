<script lang="ts">
	import { page } from '$app/state';
	import Flower1 from '../illustrations/flower-1.svelte';
	import DressSaveTheDate from '$lib/illustrations/dress-save-date.svelte';
</script>

<footer>
	<Flower1 />

	{#if !page.error}
		<DressSaveTheDate class="footer-illustration" />
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
	}
</style>
