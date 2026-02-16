<script lang="ts">
	/** eslint-disable svelte/no-at-html-tags */

	interface AccordionProps {
		name?: string;
		items: {
			title: string;
			content: string;
		}[];
	}

	const props: AccordionProps = $props();
</script>

<div class="accordion">
	{#each props.items as item (item.title)}
		<details name={props?.name}>
			<summary>
				{item.title}
			</summary>

			<div>
				{@html item.content}
			</div>
		</details>
	{/each}
</div>

<style>
	.accordion {
		display: flex;
		flex-direction: column;
		width: 100%;
	}

	details {
		--plus-icon: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiMxMzNEMUIiIHN0cm9rZS13aWR0aD0iMS4yNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1wbHVzLWljb24gbHVjaWRlLXBsdXMiPjxwYXRoIGQ9Ik01IDEyaDE0Ii8+PHBhdGggZD0iTTEyIDV2MTQiLz48L3N2Zz4=);
		--minus-icon: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiMxMzNEMUIiIHN0cm9rZS13aWR0aD0iMS4yNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1taW51cy1pY29uIGx1Y2lkZS1taW51cyI+PHBhdGggZD0iTTUgMTJoMTQiLz48L3N2Zz4=);

		border-bottom: var(--border-size-1) solid var(--text);

		& > summary::after {
			content: var(--plus-icon);
			color: var(--text);
			padding-inline-start: var(--size-2);
			font-size: var(--size-6);
			line-height: var(--font-lineheight-1);
			font-weight: var(--font-weight-3);
		}

		&[open] > summary::after {
			content: var(--minus-icon);
		}

		&[open] div {
			animation: fade-in 0.2s linear;
		}

		& :global(div > p + p) {
			margin-block-start: var(--size-3);
		}

		@media (prefers-color-scheme: dark) {
			--plus-icon: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNGQUY0RUIiIHN0cm9rZS13aWR0aD0iMS4yNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1wbHVzLWljb24gbHVjaWRlLXBsdXMiPjxwYXRoIGQ9Ik01IDEyaDE0Ii8+PHBhdGggZD0iTTEyIDV2MTQiLz48L3N2Zz4=);
			--minus-icon: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNGQUY0RUIiIHN0cm9rZS13aWR0aD0iMS4yNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1taW51cy1pY29uIGx1Y2lkZS1taW51cyI+PHBhdGggZD0iTTUgMTJoMTQiLz48L3N2Zz4=);
		}
	}

	summary {
		cursor: pointer;
		user-select: none;
		list-style: none;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-block: var(--size-4);
		font-weight: var(--font-weight-4);
	}

	div {
		padding-block-end: var(--size-4);
		font-weight: var(--font-weight-3);
	}

	@keyframes fade-in {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}
</style>
