<script lang="ts">
	import type { TGuests } from '../server/db/schema';
	import DietaryRequirements from './rsvp-form-controls/dietary-requirements.svelte';

	let { guest, plusOne }: { guest: TGuests; plusOne: TGuests | null } = $props();

	// TODO: Make first/last name required
</script>

<fieldset>
	<h2>Plus one</h2>

	<div class="input-wrapper">
		{#if plusOne?.id}
			<input type="hidden" value={plusOne.id} name={`guests[${guest.id}][plus-one][id]`} />
		{/if}

		<div class="name-input">
			<label for="firstname">First name</label>
			<input
				id="firstname"
				name={`guests[${guest.id}][plus-one][firstname]`}
				type="text"
				value={plusOne?.firstName ?? ''}
			/>
		</div>

		<div class="name-input">
			<label for="lastname">Last name</label>
			<input
				id="lastname"
				name={`guests[${guest.id}][plus-one][lastname]`}
				type="text"
				value={plusOne?.lastName ?? ''}
			/>
		</div>

		<div class="dietary-requirements">
			<DietaryRequirements
				guestId={guest.id}
				dietaryRequirements={plusOne?.dietaryRequirements ?? ''}
				isPlusOne
			/>
		</div>
	</div>
</fieldset>

<style>
	fieldset {
		align-self: stretch;
		border: solid 1px var(--text);
		padding: var(--size-3);
	}

	.input-wrapper {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
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
