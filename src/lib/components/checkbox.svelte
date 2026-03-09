<script lang="ts">
	let { name, id, label, defaultchecked, onchange } = $props();
</script>

<label>
	<input {name} {id} type="checkbox" {onchange} {defaultchecked} />

	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="3"
		stroke-linecap="round"
		stroke-linejoin="round"
		class="check"><path d="M20 6 9 17l-5-5" /></svg
	>

	{label}
</label>

<style>
	label {
		display: grid;
		grid-template-areas: 'input label';
		grid-template-columns: 1em auto;
		align-items: center;
		gap: 0.5em;
	}

	input {
		appearance: none;
		background-color: transparent;
		margin: 0;
		grid-area: input;
		display: grid;
		place-content: center;
		font: inherit;
		color: currentColor;
		width: 1.15em;
		height: 1.15em;
		border: 1px solid currentColor;
		border-radius: 0;

		&:checked {
			background-color: var(--text);
		}
	}

	input:checked + .check {
		scale: 1;
	}

	.check {
		color: var(--surface);
		grid-area: input;
		justify-self: center;
		width: 85%;
		height: auto;
		scale: 0;
		transition: 120ms transform ease-in-out;
		transform: translateX(0.05em);
		z-index: 1;
	}
</style>
