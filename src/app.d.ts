// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces

interface Env {
	DB: D1Database;
	INVITE_READY: string;
}

declare global {
	namespace App {
		interface Platform {
			env: Env;
			ctx: ExecutionContext;
			caches: CacheStorage & { default: Cache };
			cf?: IncomingRequestCfProperties;
		}

		// interface Error {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
