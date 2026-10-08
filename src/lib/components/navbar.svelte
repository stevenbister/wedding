<script lang="ts">
	const props: { inviteReady: boolean } = $props();

	type NavItem = {
		label: string;
		href: string;
	};

	const navItems: NavItem[] = [
		{ label: 'RSVP', href: '/' },
		{ label: 'Venue', href: '/venue' },
		{ label: 'Schedule', href: '/schedule' },
		{ label: 'Info', href: '/info' }
	];
</script>

<nav class="navbar">
	{#if props.inviteReady}
		<ul>
			{#each navItems as item (item.label)}
				<li><a href={item.href}>{item.label}</a></li>
			{/each}
		</ul>
	{/if}
</nav>

<style>
	nav {
		margin-block-start: 42px;
		font-weight: var(--font-weight-4);
		font-size: var(--font-size-3);
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
