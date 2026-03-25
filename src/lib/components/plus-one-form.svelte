<script lang="ts">
	import type { TGuests } from '../server/db/schema';
	import Checkbox from './checkbox.svelte';
	import DietaryRequirements from './rsvp-form-controls/dietary-requirements.svelte';

	let { guest }: { guest: TGuests } = $props();

	let isToggled: boolean = $derived(!!guest.plusOneOf);
	// TODO: Make first/last name required
</script>

<fieldset>
	<Checkbox
		id="add-plus-one"
		name="add-plus-one"
		onchange={() => (isToggled = !isToggled)}
		defaultchecked={!!guest.plusOneOf}
		label="Add a plus one"
	/>

	{#if isToggled}
		<div class="input-wrapper">
			<div class="name-input">
				<label for="firstname">First name</label>
				<input id="firstname" name={`guests[${guest.id}][plus-one][firstname]`} type="text" />
			</div>

			<div class="name-input">
				<label for="lastname">Last name</label>
				<input id="lastname" name={`guests[${guest.id}][plus-one][lastname]`} type="text" />
			</div>

			<div class="dietary-requirements">
				<DietaryRequirements guestId={guest.id} dietaryRequirements="" isPlusOne />
			</div>
		</div>
	{/if}
</fieldset>

<style>
	fieldset {
		align-self: stretch;
	}

	.input-wrapper {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		padding: var(--size-3);
		border: solid 1px var(--text);
		gap: var(--size-3);

		div input {
			width: 100%;
		}
	}

	.name-input {
		display: flex;
		flex-direction: column;
		gap: var(--size-px-2);
		grid-column: span 2;

		@media (min-width: 30rem) {
			grid-column: span 1;
		}
	}

	.dietary-requirements {
		grid-column: 1 / -1;
		display: flex;
		flex-direction: column;
		gap: var(--size-3);
	}
</style>
