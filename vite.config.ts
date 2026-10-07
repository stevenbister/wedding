import { defineConfig } from 'vitest/config';
import { playwright } from '@vitest/browser-playwright';
import { sveltekit } from '@sveltejs/kit/vite';
import { cloudflareTest, readD1Migrations } from '@cloudflare/vitest-plugin';

export default defineConfig({
	plugins: [sveltekit()],

	test: {
		expect: { requireAssertions: true },

		projects: [
			{
				extends: './vite.config.ts',

				test: {
					name: 'client',

					browser: {
						enabled: true,
						provider: playwright(),
						instances: [{ browser: 'chromium', headless: true }]
					},

					include: ['src/**/*.svelte.{test,spec}.{js,ts}'],
					exclude: ['src/lib/server/**']
				}
			},

			{
				extends: './vite.config.ts',
				plugins: [
					cloudflareTest(async () => {
						const migrations = await readD1Migrations({
							projectPath: import.meta.dirname,
							migrationsDir: './src/lib/server/db/migrations'
						});

						return {
							wrangler: {
								configPath: './wrangler.jsonc'
							},
							miniflare: {
								bindings: { TEST_MIGRATIONS: migrations }
							}
						};
					})
				],
				test: {
					name: 'server',
					environment: 'node',
					include: ['src/**/*.{test,spec}.{js,ts}'],
					exclude: ['src/**/*.svelte.{test,spec}.{js,ts}'],
					setupFiles: ['./vitest-setup.ts']
				}
			}
		]
	}
});
