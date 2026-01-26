import adapter from '@sveltejs/adapter-cloudflare';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		alias: {
			$: 'src',
			$styles: 'src/styles',
			$constants: 'src/constants'
		}
	}
};

export default config;
