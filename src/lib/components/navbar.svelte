<script lang="ts">
	import { flags } from '$constants/flags';

	type NavItem = {
		label: string;
		href: string;
		requiresInvite?: boolean;
	};

	const navItems: NavItem[] = [
		{ label: 'RSVP', href: '/', requiresInvite: true },
		{ label: 'Venue', href: '/venue' },
		{ label: 'Schedule', href: '/schedule', requiresInvite: true },
		{ label: 'Info', href: '/info' }
	];

	const visibleNavItems = navItems.filter((item) => flags.inviteReady || !item.requiresInvite);
</script>

<nav class="navbar">
	<ul>
		{#each visibleNavItems as item (item.label)}
			<li><a href={item.href}>{item.label}</a></li>
		{/each}
	</ul>
</nav>

<style>
	nav {
		margin-block-start: var(--size-px-6);
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
