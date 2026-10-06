<script lang="ts">
	import { browser } from '$app/environment';
	import { getSessionId, trackClick } from '../utils/analytics';

	const storedGuestId = browser ? sessionStorage.getItem('guest-id') : null;
</script>

{#if storedGuestId}
	<a
		class="btn"
		href={`/rsvp/${storedGuestId}`}
		onclick={() => {
			trackClick(`rsvp-${storedGuestId}`, {
				sessionId: getSessionId(),
				guestId: storedGuestId
			});
		}}>RSVP</a
	>
{:else}
	<a
		class="btn"
		href="/rsvp"
		onclick={() => {
			trackClick('rsvp', {
				sessionId: getSessionId()
			});
		}}>RSVP</a
	>
{/if}
