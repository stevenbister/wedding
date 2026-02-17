import adapter from '@sveltejs/adapter-cloudflare';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		alias: {
			$: 'src',
			$styles: 'src/styles',
			$constants: 'src/constants'
		},
		csp: {
			directives: {
				'script-src': ['self']
			},
			reportOnly: {
				'script-src': ['self'],
				'report-uri': ['/']
			}
		}
	}
};

export default config;
