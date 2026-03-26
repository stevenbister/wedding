<script lang="ts">
	import { enhance } from '$app/forms';
	import { content } from '$constants/content';
	import { fade } from 'svelte/transition';
	import type { TGuests } from '../server/db/schema';
	import type { ActionData } from '../../routes/rsvp/[guestId]/$types';
	import DietaryRequirements from './rsvp-form-controls/dietary-requirements.svelte';
	import ToggleButtons from './rsvp-form-controls/toggle-buttons.svelte';
	import { getRSVPResponseFromForm, type RSVPResponse } from '../utils/rsvp-helpers';
	import Celebrate from '../illustrations/celebrate.svelte';
	import Chairs from '../illustrations/chairs.svelte';
	import PlusOneForm from './plus-one-form.svelte';
	import Callout from './callout.svelte';

	interface Props {
		data: {
			guest: TGuests;
			partner: TGuests | null;
			plusOne: TGuests | null;
		};
		form: ActionData;
	}

	let { data, form }: Props = $props();

	const response = $derived(getRSVPResponseFromForm(form?.guestResponses ?? []));
</script>

{#if response === 'all_true'}
	{@render responseMessage(response, content.rsvp.formResponse.rsvp_true)}
{:else if response === 'some_true'}
	{@render responseMessage(response, content.rsvp.formResponse.rsvp_true)}
{:else if response === 'all_false'}
	{@render responseMessage(response, content.rsvp.formResponse.rsvp_false)}
{:else if response === 'no_response'}
	<form class="form" method="POST" action="?/rsvp" novalidate use:enhance>
		{@render formFields(data.guest)}

		{#if data.partner}
			{@render formFields(data.partner)}
		{/if}

		<div>
			<label for="message">If want to leave any other message please add it here</label>
			<textarea name="message" id="message"></textarea>
		</div>

		{#if data.guest.canAddPlusOne}
			<PlusOneForm guest={data.guest} plusOne={data.plusOne} />
		{/if}

		{#if form?.error}
			<p class="error text-regular" id="error-message" aria-live="polite" transition:fade>
				{form.message}
			</p>
		{/if}

		<button class="btn">Submit</button>

		<Callout description={content.rsvp.contact} class="full-width" />
	</form>
{/if}

{#snippet formFields(guest: TGuests)}
	<fieldset>
		<legend class="cursive">
			{guest.firstName}
		</legend>

		<ToggleButtons guestId={guest.id} response={guest.rsvp} />

		<DietaryRequirements guestId={guest.id} dietaryRequirements={guest.dietaryRequirements} />
	</fieldset>
{/snippet}

{#snippet responseMessage(response: RSVPResponse, message: string)}
	<div class="response-message">
		{#if response === 'all_true' || response === 'some_true'}
			<Celebrate />
		{:else}
			<Chairs />
		{/if}

		<h2>Thank you!</h2>

		<p>{message}</p>

		<a class="btn ghost" href={`/rsvp/${data.guest.id}`} data-sveltekit-replacestate
			>Change my response</a
		>
	</div>
{/snippet}

<style>
	form {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--size-px-5);
	}

	fieldset {
		align-self: stretch;
	}

	legend {
		font-size: var(--font-size-7);
		line-height: var(--font-lineheight-0);
		margin-bottom: var(--size-3);
	}

	div {
		display: flex;
		flex-direction: column;
		gap: var(--size-px-2);
		width: 100%;
	}

	.response-message {
		margin-inline: auto;
		align-items: center;
		text-align: center;
		gap: var(--size-px-3);
		max-width: 70ch;
	}

	.error {
		color: var(--red-9);
	}
</style>
