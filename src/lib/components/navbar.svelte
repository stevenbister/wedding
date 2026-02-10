<script lang="ts">
	/* eslint svelte/no-navigation-without-resolve: "off" */
	import { resolve } from '$app/paths';
	import type { ResolvedPathname } from '$app/types';

	const navItems: {
		label: string;
		href: ResolvedPathname;
	}[] = [
		{
			label: 'RSVP',
			href: resolve('/')
		},
		{
			label: 'Venue',
			href: resolve('/venue')
		},
		{
			label: 'Schedule',
			href: resolve('/schedule')
		},
		{
			label: 'Info',
			href: resolve('/info')
		}
	];
</script>

<nav>
	<ul>
		{#each navItems as item (item.label)}
			<li><a href={item.href}>{item.label}</a></li>
		{/each}
	</ul>
</nav>

<style>
	nav {
		margin-block-start: var(--size-px-8);
		font-weight: var(--font-weight-4);
	}

	ul {
		padding: 0;
		list-style: none;
		display: flex;
		gap: 14px;
		justify-content: center;
		align-items: center;
	}

	a {
		text-decoration: none;
		color: var(--text);
	}
</style>
