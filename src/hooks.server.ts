import { type Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { Database } from '$lib/server/db';

const setDB: Handle = async ({ event, resolve }) => {
	Database.initialize(event.platform?.env.DB);

	const db = Database.getInstance();
	event.locals.db = db;

	return await resolve(event);
};

const setCalendarEventHeaders: Handle = async ({ event, resolve }) => {
	const response = await resolve(event);

	if (event.url.pathname.endsWith('.ics')) {
		response.headers.set('Content-Type', 'text/calendar; charset=utf-8');
		response.headers.set('Content-Disposition', 'attachment; filename="steve-grace-wedding.ics"');
	}

	return response;
};

export const handle = sequence(setDB, setCalendarEventHeaders);
