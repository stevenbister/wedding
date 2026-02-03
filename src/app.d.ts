// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces

interface Env {
	DB: D1Database;
}

declare global {
	namespace App {
		interface Platform {
			env: Env;
			ctx: ExecutionContext;
			caches: CacheStorage & { default: Cache };
			cf?: IncomingRequestCfProperties;
		}

		interface Locals {
			db: import('$lib/server/db').DbClient;
		}

		// interface Error {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
