import { dev } from '$app/environment';
import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { flags } from '$constants/flags';

export const load: PageServerLoad = async () => {
	if (!flags.inviteReady && !dev) {
		redirect(307, '/save-the-date');
	}
};
