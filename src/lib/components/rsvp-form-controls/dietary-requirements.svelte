<script lang="ts">
	import { fade } from 'svelte/transition';
	import Checkbox from '../checkbox.svelte';

	const { guestId, dietaryRequirements }: { guestId: string; dietaryRequirements: string | null } =
		$props();

	let isToggled: boolean = $derived(!!dietaryRequirements);
</script>

<div>
	<Checkbox
		id={guestId}
		onchange={() => (isToggled = !isToggled)}
		defaultchecked={!!dietaryRequirements}
		label="I have dietary requirements"
	/>
</div>

{#if isToggled}
	<label for={`guests[${guestId}][dietary-requirements]`}
		>Please add your dietary requirements here:</label
	>
	<textarea
		name={`guests[${guestId}][dietary-requirements]`}
		id={`guests[${guestId}][dietary-requirements]`}
		defaultvalue={dietaryRequirements ? dietaryRequirements : ''}
		in:fade
	></textarea>
{/if}
