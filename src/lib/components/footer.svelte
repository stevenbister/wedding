<script lang="ts">
	import Flower1 from '../illustrations/flower-1.svelte';
</script>

<footer>
	<Flower1 />
	<Flower1 />
</footer>

<style>
	footer {
		position: relative;
		min-height: var(--size-px-12);
		padding-block-end: var(--size-px-7);
	}

	footer :global(.flower-1) {
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
</style>
