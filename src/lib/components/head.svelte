<script lang="ts">
	import { page } from '$app/state';
	import favicon from '$lib/assets/favicon.svg';
	import { buildMetaTitle } from '../utils/meta';

	interface HeadProps {
		title: string;
		image: {
			src: string;
			alt: string;
		};
		description: string;
		type?: string;
	}

	let { title, image, description, type = 'article' }: HeadProps = $props();

	const metaTitle = $derived(buildMetaTitle(title));
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>{metaTitle}</title>
	<meta property="og:title" content={metaTitle} />
	<meta property="og:description" content={description} />
	<meta property="og:type" content={type} />
	<meta property="og:image" content={image.src} />
	<meta property="og:url" content={page.url.href} />
	<meta property="og:site_name" content="Steve & Grace get married" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:image:alt" content={image.alt} />
</svelte:head>
