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
	import Spinner from './spinner.svelte';
	import Lily2 from '../illustrations/lily-2.svelte';
	import Dance from '../illustrations/dance.svelte';
	import SaveTheDateButton from './save-the-date-button.svelte';

	interface Props {
		data: {
			guest: TGuests & {
				songRequest: string | null;
			};
			partner: TGuests | null;
			plusOne: TGuests | null;
		};
		form: ActionData;
	}

	let { data, form }: Props = $props();
	let isLoading: boolean = $state(false);

	const response = $derived(getRSVPResponseFromForm(form?.guestResponses ?? []));

	$inspect(data);

	$effect(() => {
		if (response !== 'no_response') {
			window.scrollTo(0, 0);
		}
	});
</script>

{#if response === 'all_true'}
	{@render responseMessage(response, content.rsvp.formResponse.rsvp_true)}
{:else if response === 'some_true'}
	{@render responseMessage(response, content.rsvp.formResponse.rsvp_true)}
{:else if response === 'all_false'}
	{@render responseMessage(response, content.rsvp.formResponse.rsvp_false)}
{:else if response === 'no_response'}
	<aside>
		<Dance />
		{#if data.guest.guestType === 'all_day'}
			<div>
				<p>{content.rsvp.formGuestMessage.allDay}</p>
				<p>Please reply by <strong>{content.rsvp.deadline}</strong></p>
			</div>
		{:else if data.guest.guestType === 'evening'}
			<div>
				<p>{content.rsvp.formGuestMessage.evening}</p>
				<p>Please reply by <strong>{content.rsvp.deadline}</strong></p>
			</div>
		{/if}
	</aside>

	<form
		class="form"
		method="POST"
		action="?/rsvp"
		novalidate
		use:enhance={() => {
			isLoading = true;

			return async ({ update }) => {
				update({ invalidateAll: true }).finally(async () => {
					isLoading = false;
				});
			};
		}}
	>
		<Lily2 />
		{@render formFields(data.guest)}

		{#if data.partner}
			{@render formFields(data.partner)}
		{/if}

		<div>
			<label for="message">
				If you have a favourite memory, thing or anecdote about us (either as a couple or
				individually) let us know and it might make it into the wedding somewhere</label
			>
			<textarea name="message" id="message">{data.guest.message}</textarea>
		</div>

		<div>
			<label for="song-request"
				>Got a song you'll dance to? Share it with us and it might make it into the wedding
				playlist!</label
			>
			<textarea name="song-request" id="song-request" aria-describedby="song-request-description"
				>{data.guest.songRequest ?? ''}</textarea
			>
			<span id="song-request-description" class="field-description"
				>Include the artist if possible to make it easier for us to find</span
			>
		</div>

		{#if data.guest.canAddPlusOne}
			<PlusOneForm guest={data.guest} plusOne={data.plusOne} />
		{/if}

		{#if form?.error}
			<p class="error text-regular" id="error-message" aria-live="polite" transition:fade>
				{form.message}
			</p>
		{/if}

		<button class="btn">
			{#if isLoading}
				<Spinner />
			{:else}
				Submit
			{/if}
		</button>

		<p>{content.noKids}</p>
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

		<div class="btn-container">
			{#if response === 'all_true' || response === 'some_true'}
				<SaveTheDateButton />
			{/if}

			<a class="btn ghost" href={`/rsvp/${data.guest.id}`} data-sveltekit-replacestate
				>Change my response</a
			>
		</div>
	</div>
{/snippet}

<style>
	aside {
		display: flex;
		align-items: center;
		font-weight: var(--font-weight-3);
		text-wrap: balance;

		:global(svg) {
			flex-shrink: 0;
			max-width: var(--size-10);
		}
	}

	form {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--size-px-5);
		border: solid 1px var(--text);
		padding: var(--size-px-3);
		margin-block: var(--size-px-5);
		overflow: clip;

		p {
			font-weight: var(--font-weight-3);
			font-size: var(--font-size-1);
			text-align: center;
			max-width: 40ch;
		}
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

	.btn-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		max-width: max-content;

		:global(.save-the-date) {
			width: 100%;
		}
	}

	.error {
		color: var(--red-9);
	}
</style>
