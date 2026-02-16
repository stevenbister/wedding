<script lang="ts">
	import Illustration from '$lib/illustrations/woman-in-martini.svelte';

	interface CalloutProps {
		description: string;
		class?: string;
	}

	const props: CalloutProps = $props();
</script>

<aside class={props?.class}>
	<Illustration />

	<p>
		{props.description}
	</p>
</aside>

<style>
	aside {
		position: relative;
		display: flex;
		align-items: center;
		padding-inline: var(--size-6) var(--size-1);
		padding-block: var(--size-2);
		border: var(--border-size-1) solid var(--text);
		text-align: start;
		font-weight: var(--font-weight-3);

		@media (min-width: 34rem) {
			padding-inline-end: var(--size-2);
			padding-block: var(--size-4);
		}

		:global(svg) {
			--size: 50px;

			position: absolute;
			left: calc((var(--size) / 2) * -1);
			width: var(--size);
			height: auto;
			background-color: var(--surface);
		}
	}
</style>
