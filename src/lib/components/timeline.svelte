<script lang="ts">
	import { schedule } from '../../constants/schedule';
</script>

<div class="timeline">
	{#each schedule as { event, time, content, illustration } (event)}
		<div class="timeline-event">
			<div class="timeline-content">
				<div class="timeline-separator"></div>
				<div class="timeline-indicator"></div>

				<div class="timeline-event-header">
					<h2>{event}</h2>
				</div>
				<p>{time}</p>
				<p class="text-light">{content}</p>
			</div>
			<div class="timeline-illustration">
				<svelte:component this={illustration} />
			</div>
		</div>
	{/each}
</div>

<style>
	h2 {
		font-size: var(--font-size-6);
	}

	.timeline {
		display: flex;
		flex-direction: column;
	}

	.timeline-event {
		position: relative;
		display: flex;
		justify-content: center;
		align-items: flex-start;
		padding-block-end: var(--size-8);

		&:nth-child(odd) {
			text-align: right;

			.timeline-content {
				padding-inline-end: var(--size-5);
			}

			p {
				margin-inline-start: auto;
			}
		}

		&:nth-child(even) {
			flex-direction: row-reverse;

			.timeline-content {
				padding-inline-start: var(--size-5);
			}

			.timeline-illustration {
				justify-content: flex-end;
			}
		}

		&:last-child {
			.timeline-separator {
				display: none;
			}
		}
	}

	.timeline-content,
	.timeline-illustration {
		width: 50%;
	}

	.timeline-content {
		p {
			max-width: 40ch;
		}
	}

	.timeline-illustration {
		display: flex;
		justify-content: flex-start;

		:global(svg) {
			width: 120px;
			height: 120px;
		}
	}

	.timeline-indicator,
	.timeline-separator {
		top: 20px;
	}

	.timeline-indicator {
		position: absolute;
		left: 50%;
		transform: translateX(-50%) rotate(45deg);
		transform-origin: center;
		display: block;
		width: 10px;
		height: 10px;
		background-color: var(--surface);
		border: 1px solid var(--text);
	}

	.timeline-separator {
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		display: block;
		width: 1px;
		height: 100%;
		background-color: var(--text);
	}
</style>
