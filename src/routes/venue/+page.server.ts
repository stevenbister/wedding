import { isProd } from '$lib/utils/is-prod';
import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { flags } from '$constants/flags';

export const load: PageServerLoad = async () => {
	if (!flags.inviteReady && isProd) {
		redirect(307, '/save-the-date');
	}
};
