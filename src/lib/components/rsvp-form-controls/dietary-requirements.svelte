<script lang="ts">
	import { fade } from 'svelte/transition';
	import Checkbox from '../checkbox.svelte';

	const { guestId, dietaryRequirements }: { guestId: string; dietaryRequirements: string | null } =
		$props();

	let isToggled: boolean = $derived(!!dietaryRequirements);
</script>

<Checkbox
	id={`guests[${guestId}][has-dietary-requirements]`}
	name={`guests[${guestId}][has-dietary-requirements]`}
	onchange={() => (isToggled = !isToggled)}
	defaultchecked={!!dietaryRequirements}
	label="I have dietary requirements"
/>

{#if isToggled}
	<div>
		<label for={`guests[${guestId}][dietary-requirements]`}
			>Please add your dietary requirements here:</label
		>
		<textarea
			name={`guests[${guestId}][dietary-requirements]`}
			id={`guests[${guestId}][dietary-requirements]`}
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
