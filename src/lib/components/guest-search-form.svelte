<script lang="ts">
	import { enhance } from '$app/forms';
	import { fade } from 'svelte/transition';
	import type { ActionData } from '../../routes/$types';

	let { form }: { form: ActionData } = $props();
</script>

<form class="form" method="POST" action="?/search" novalidate use:enhance>
	{#if form?.error}
		<p class="error" id="error-message" aria-live="polite" transition:fade>{form.message}</p>
	{/if}

	<div class="input-container">
		<label for="phone" class="label">Phone number</label>
		<input
			id="phone"
			name="phone"
			type="text"
			inputmode="numeric"
			pattern="[0-9]*"
			placeholder="07123456789"
			aria-describedby="error-message"
			value={form?.phoneNumber}
		/>
	</div>

	<button class="btn">Search</button>
</form>

<style>
	form {
		display: flex;
		flex-direction: column;
		gap: var(--size-6);
		align-items: center;
	}

	.input-container {
		width: 100%;
	}
</style>
