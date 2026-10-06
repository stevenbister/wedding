import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { flags } from '$constants/flags';
import { isProd } from '$lib/utils/is-prod';

export const load: PageServerLoad = async () => {
	if (!flags.inviteReady && isProd) {
		redirect(307, '/save-the-date');
	}
};
