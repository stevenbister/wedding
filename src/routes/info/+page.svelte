<script lang="ts">
	import { content } from '$/constants/content';
	import Head from '$/lib/components/head.svelte';
	import Accordion from '$/lib/components/accordion.svelte';
	import { kebab } from '$/lib/utils/kebab';

	import Car from '$/lib/illustrations/car.svelte';
	import Checklist from '$/lib/illustrations/checklist.svelte';
	import Groomsmen from '$/lib/illustrations/groomsmen.svelte';
	import Cheers from '$/lib/illustrations/cheers.svelte';
	import Gift from '$/lib/illustrations/gift.svelte';
	import SuitAndDress from '$/lib/illustrations/suit-and-dress.svelte';
</script>

<Head
	title={content.info.title}
	image={{
		src: '/social/steve-and-grace-get-married.png',
		alt: content.rsvp.title
	}}
	description={content.social}
/>

<article class="container narrow">
	<h1>{content.info.title}</h1>

	{#each content.info.sections as section (section.title)}
		<section id={`${kebab(section.title)}-section`} aria-labelledby={kebab(section.title)}>
			<div>
				{#if section.icon}
					{@render icon(section.icon)}
				{/if}
				<h2 id={kebab(section.title)}>{section.title}</h2>
			</div>

			<Accordion name={kebab(section.title)} items={section.info} />
		</section>
	{/each}
</article>

{#snippet icon(name: string)}
	{#if name === 'car'}
		<Car />
	{:else if name === 'checklist'}
		<Checklist />
	{:else if name === 'groomsmen'}
		<Groomsmen />
	{:else if name === 'cheers'}
		<Cheers />
	{:else if name === 'gift'}
		<Gift />
	{:else if name === 'suit-and-dress'}
		<SuitAndDress />
	{/if}
{/snippet}

<style>
	h1 {
		text-align: center;
		margin-block-start: var(--size-px-4);
	}

	h2 {
		font-family: 'Source Serif', serif;
		font-size: var(--font-size-3);
		text-wrap: wrap;
		text-align: center;
	}

	section {
		margin-block-start: var(--size-px-4);
	}

	div {
		display: flex;
		align-items: center;
		flex-direction: column;
		gap: var(--size-px-2);

		:global(svg) {
			width: var(--size-px-10);
			height: auto;
		}
	}
</style>
