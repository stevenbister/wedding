<script lang="ts">
	import { navigating } from '$app/state';
	import { cubicOut } from 'svelte/easing';
	import { Tween } from 'svelte/motion';
	import { fade } from 'svelte/transition';
	import { untrack } from 'svelte';

	const tween = new Tween(0, {
		duration: 200,
		easing: cubicOut
	});

	let timeout: ReturnType<typeof setTimeout> | null = null;
	let isVisible = $state(false);

	function reset() {
		if (timeout) {
			clearTimeout(timeout);
			timeout = null;
		}

		tween.set(0, { duration: 0 });
	}

	function increase() {
		const progressLeft = 1 - tween.current;
		tween.set(tween.current + progressLeft * 0.04);

		if (tween.current > 1) tween.set(1);

		if (navigating.complete) {
			timeout = setTimeout(increase, 50);
		} else {
			tween.set(1);
			timeout = setTimeout(() => {
				isVisible = false;
				tween.set(0, { duration: 0 });
			}, 150);
		}
	}

	$effect(() => {
		if (navigating.complete) {
			untrack(() => {
				isVisible = true;
				reset();
				increase();
			});
		}
	});
</script>

{#if isVisible}
	<progress value={tween.current} in:fade={{ duration: 300 }} out:fade={{ duration: 300 }}>
	</progress>
{/if}

<style>
	progress {
		position: fixed;
		top: 0;
		z-index: 99999;
		left: 0;
		height: 4px;
		width: 100%;
		appearance: none;
		border: none;
		outline: none; /* firefox has a default outline */
	}

	progress::-webkit-progress-bar {
		background-color: transparent;
	}

	progress::-webkit-progress-value {
		background-color: var(--text);
	}

	progress::-moz-progress-bar {
		background-color: var(--text);
	}
</style>
