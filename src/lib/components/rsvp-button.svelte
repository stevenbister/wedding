<script lang="ts">
	import { browser } from '$app/environment';

	const storedGuestId = browser ? sessionStorage.getItem('guest-id') : null;
</script>

{#if storedGuestId}
	<a class="btn" href={`/rsvp/${storedGuestId}`}>RSVP</a>
{:else}
	<a class="btn" href="/rsvp">RSVP</a>
{/if}
