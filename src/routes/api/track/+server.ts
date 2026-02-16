import { json } from '@sveltejs/kit';
import { Database } from '$lib/server/db';
import { events, type EventsInsert } from '$lib/server/db/schema';
import { isbot } from 'isbot';

export async function POST({ request, url }) {
	const userAgent = request.headers.get('user-agent');

	if (isbot(userAgent)) {
		return json(null, { status: 204 });
	}

	const body = (await request.json()) as EventsInsert;

	const db = Database.getInstance();

	await db.insert(events).values({
		type: body.type,
		name: body.name,
		meta: body.meta ?? null,
		page: body.page ?? url.pathname,
		userAgent: request.headers.get('user-agent'),
		referrer: request.headers.get('referer')
	});

	return json(null, { status: 200 });
}
