<script lang="ts">
	import { fade } from 'svelte/transition';
	import Checkbox from '../checkbox.svelte';

	const {
		guestId,
		dietaryRequirements,
		isPlusOne
	}: { guestId: string; dietaryRequirements: string | null; isPlusOne?: boolean } = $props();

	let isToggled: boolean = $derived(!!dietaryRequirements);
	let idPrefix = $derived(isPlusOne ? `guests[${guestId}][plus-one]` : `guests[${guestId}]`);
</script>

<Checkbox
	id={`${idPrefix}[has-dietary-requirements]`}
	name={`${idPrefix}[has-dietary-requirements]`}
	onchange={() => (isToggled = !isToggled)}
	defaultchecked={!!dietaryRequirements}
	label="I have dietary requirements"
/>

{#if isToggled}
	<div>
		<label for={`${idPrefix}[dietary-requirements]`}
			>Please add your dietary requirements here:</label
		>
		<textarea
			name={`${idPrefix}[dietary-requirements]`}
			id={`${idPrefix}[dietary-requirements]`}
			defaultvalue={dietaryRequirements ? dietaryRequirements : ''}
			in:fade
		></textarea>
	</div>
{/if}

<style>
	div {
		display: flex;
		flex-direction: column;
		gap: var(--size-px-2);
	}
</style>
