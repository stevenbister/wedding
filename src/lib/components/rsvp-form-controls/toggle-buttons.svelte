<script lang="ts">
	let { guestId, response }: { guestId: string; response: boolean | null } = $props();

	const getRsvpValue = () => {
		if (response === true || response === false) {
			return response ? 'accept' : 'decline';
		}

		return null;
	};

	let pressedButton: 'accept' | 'decline' | null = $derived(getRsvpValue());
</script>

<div>
	{@render button('accept')}
	{@render button('decline')}
</div>

{#snippet button(acceptOrDecline: 'accept' | 'decline' | null)}
	<button
		class={['btn ghost', pressedButton === acceptOrDecline ? 'pressed' : '']}
		onclick={() => (pressedButton = acceptOrDecline)}
		type="button"
	>
		{acceptOrDecline === 'accept' ? 'Accept' : 'Decline'}
	</button>
	<input
		type="radio"
		name={`guests[${guestId}][rsvp]`}
		value={acceptOrDecline}
		checked={pressedButton === acceptOrDecline}
		class="hidden"
	/>
{/snippet}

<style>
	div {
		display: flex;
		gap: var(--size-4);
	}

	.btn {
		width: 100%;
	}
</style>
