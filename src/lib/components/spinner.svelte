<div class="spinner">
	<div class="dot"></div>
	<div class="dot"></div>
	<div class="dot"></div>
</div>

<style>
	.spinner {
		margin: auto;
		padding: var(--size-2);
	}

	.dot {
		width: 10px;
		height: 10px;
		background: var(--surface);
		border-radius: 100%;
		float: left;
		margin-right: 5px;

		&:nth-child(1) {
			animation: bounce 1s infinite;
			animation-delay: 0.1s;
			background: var(--surface);
		}
		&:nth-child(2) {
			animation: bounce 1s infinite;
			animation-delay: 0.3s;
			background: var(--surface);
		}
		&:nth-child(3) {
			animation: bounce 1s infinite ease;
			animation-delay: 0.5s;
			background: var(--surface);
		}
	}

	@keyframes bounce {
		0%,
		100% {
			opacity: 1;
		}
		60% {
			opacity: 0;
		}
	}
</style>
